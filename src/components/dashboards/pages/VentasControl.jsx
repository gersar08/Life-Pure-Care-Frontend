import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VentasControl() {
  const [infoClientSelected, setInfoClientSelected] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [infoClients, setInfoClients] = useState();
  const [inventario, setInventario] = useState();
  const [registro, setRegistro] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Hook para obtener los clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/clientes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setInfoClients(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  // Hook para obtener el cliente seleccionado
  useEffect(() => {
    if (infoClients && selectedOption) {
      const selectedClient = infoClients.find(
        (client) => client.unique_id === selectedOption
      );
      setInfoClientSelected(selectedClient);
    }
  }, [infoClients, selectedOption]);

  // Hook para obtener el inventario
  useEffect(() => {
    const obtenerInventario = async () => {
      const axiosInstance = axios.create({
        baseURL: "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        const response = await axiosInstance.get("/inventario");
        setInventario(response.data);
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      }
    };

    obtenerInventario();
  }, [token]);

  // Hook para obtener el registro
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistro((prevState) => ({ ...prevState, [name]: value }));
  };

  //Hook para peticiones al backend
  const axiosInstance = axios.create({
    baseURL: "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Función para guardar los datos del cliente seleccionado
  const guardarDatosCliente = (cliente) => {
    setInfoClientSelected(cliente);
  };

  const actualizarInventario = async (registro, inventario) => {
    const updatePromises = [];

    for (let key in registro) {
      let keyWithoutSuffix = key.replace(/(_in|_out)$/, "");
      let producto = inventario.find(
        (prod) => prod.product_name === keyWithoutSuffix
      );
      if (producto && key.endsWith("_in")) {
        producto.cantidad = Number(producto.cantidad) + Number(registro[key]);
      } else if (producto) {
        producto.cantidad = Number(producto.cantidad) - Number(registro[key]);
      }
      // Agrega la promesa a la lista
      updatePromises.push(
        axiosInstance.put(`/inventario/${producto.id}`, {
          cantidad: producto.cantidad,
        })
      );
    }

    // Espera a que todas las promesas se completen antes de continuar
    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
    } else {
      console.log("No hay promesas para resolver");
    }
  };

  // Función para actualizar el inventario
  const enviarInventario = async (inventario) => {
    const updatePromises = inventario.map((product) => {
      return axiosInstance.put(`/inventario/${product.id}`, {
        cantidad: product.cantidad,
      });
    });
    await Promise.all(updatePromises);
  };

  // Función para verificar si el cliente ya existe
  const verificarCliente = async (cliente, registro) => {
    try {
      const response = await axiosInstance.post("/registro/daily", {
        cliente_id: cliente.unique_id,
        fardo: registro.fardo_in,
        garrafa: registro.garrafa_in,
        pet: registro.pet_in,
      });
      return response.status !== 422;
    } catch (error) {
      return false;
    }
  };

  const obtenerRegistroCliente = async (cliente) => {
    try {
      const response = await axiosInstance.get(
        `/registro/daily/search/${cliente.unique_id}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };
  const sumarDatosProductos = (registro, datosCliente) => {
    // Recorre cada entrada en el objeto registro
    for (let key in registro) {
      // Extrae el nombre del producto desde la clave
      let nombreProducto = key.slice(0, -3);

      // Verifica si la clave termina en "_in" o "_out"
      if (key.endsWith("_in") || key.endsWith("_out")) {
        // Encuentra el producto correspondiente en datosCliente por nombre
        if (datosCliente.hasOwnProperty(nombreProducto)) {
          let cantidad = parseInt(registro[key]);
          if (key.endsWith("_in")) {
            datosCliente[nombreProducto] -= cantidad;
          } else if (key.endsWith("_out")) {
            datosCliente[nombreProducto] += cantidad;
          }
        }
      }
    }
    // Devuelve los datos del cliente con las cantidades actualizadas
    return datosCliente;
  };

  const enviarRegistroCliente = async (cliente, datos) => {
    await axiosInstance.put(`/registro/daily/${cliente.unique_id}`, {
      fardo: datos.fardo,
      garrafa: datos.garrafa,
      pet: datos.pet,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 1. Guardar los datos del cliente seleccionado en una variable (infoClientSelected) ✅
      guardarDatosCliente(selectedOption);

      // 2. Hacer solicitud Get del stock en inventario ✅

      // 3. Actualizar los datos de in/out en el inventario ✅
      actualizarInventario(registro, inventario);

      // 4. Realizar la solicitud put al inventario con los datos actualizados✅
      await enviarInventario(inventario);
      // 5. Verificar si el cliente ya existe, si no existe realizar una solicitud post en registro daily ✅
      const clienteExiste = await verificarCliente(
        infoClientSelected,
        registro
      );

      if (!clienteExiste) {
        // 6. Si existe, realizar solicitud get con la información del cliente✅
        const datosCliente = await obtenerRegistroCliente(infoClientSelected);
        // 7. Sumar los datos de los productos ✅
        const datosSumados = sumarDatosProductos(registro, datosCliente);

        // 8. Realizar la solicitud put con los datos actualizados ✅
        await enviarRegistroCliente(infoClientSelected, datosSumados);
        //end if
      } else if (infoClientSelected?.unique_id) {
        // Cliente no existe, realizar solicitud PUT en registro daily ✅
        await axiosInstance.put(
          `/registro/daily/${infoClientSelected.unique_id}`,
          {
            unique_id: infoClientSelected.unique_id,
          }
        );
      } else {
        console.error("infoClientSelected.unique_id es undefined o null");
      }

      // Limpiar las variables ✅
      setInventario([]);
      setRegistro({});
      // Si all ha ido bien hasta este punto, mostrar una notificación de éxito
      toast.success("Datos actualizados", {
        duration: 10000,
        position: "top-center",
      });
    } catch (error) {
      alert("Error, intentelo mas tarde");
      console.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />

      <section className="py-1 bg-blueGray-50">
        <div className=" h-full lg:w-8/12 mb-5 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Control de Ventas
                </h6>
                <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-3  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() =>
                    navigate("/admin-dashboard/facturacion/generate", {
                      state: { selectedOption },
                    })
                  }
                >
                  Generar Factura
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del cliente
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        N° de referencia
                      </label>
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Seleccione el cliente</option>
                        {infoClients &&
                          infoClients.length > 0 &&
                          infoClients.map((client) => (
                            <option
                              key={client.unique_id}
                              value={client.unique_id}
                            >
                              {client.unique_id}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Nombre del cliente
                      </label>
                      <input
                        type="name"
                        className="border-0 px-3 py-3 opacity-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={
                          infoClientSelected?.nombre +
                          " " +
                          infoClientSelected?.apellido
                        } //cambiar por props
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        N° de telefono
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 opacity-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={infoClientSelected?.telefono} //cambiar por props
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Documento de identidad
                      </label>
                      <input
                        type="number"
                        className="border-0 opacity-50 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={infoClientSelected?.n_documento} //cambiar por props
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de productos de entrada
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4"></div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Garrafones
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="garrafa_in"
                        value={registro?.garrafa_in || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Fardos
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="fardo_in"
                        value={registro?.fardo_in || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Pet
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="pet_in"
                        value={registro?.pet_in || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de productos salida
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4"></div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Garrafones
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="garrafa_out"
                        value={registro?.garrafa_out || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Fardos
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="fardo_out"
                        value={registro?.fardo_out || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Pet
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="pet_out"
                        value={registro?.pet_out || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-3 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Actualizar datos
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
