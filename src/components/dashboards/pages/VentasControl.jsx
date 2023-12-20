/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function VentasControl() {
  const [infoClientSelected, setInfoClientSelected] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [infoClients, setInfoClients] = useState(null);
  const [inventario, setInventario] = useState(null);
  const [registro, setRegistro] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/clientes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setInfoClients(data);
        console.log(infoClients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() => {
    if (infoClients && selectedOption) {
      const selectedClient = infoClients.find(
        (client) => client.unique_id === selectedOption
      );
      setInfoClientSelected(selectedClient);
    }
  }, [infoClients, selectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setInventario(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistro((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let [key, value] of Object.entries(registro)) {
      const productName = key.endsWith("_in") ? key.slice(0, -3) : key;
      const product = inventario.find(
        (item) => item.product_name === productName
      );
      if (product) {
        product.cantidad += key.endsWith("_in")
          ? Number(value)
          : -Number(value);
      }
    }

    // Actualizar el inventario en la base de datos
    const updatePromises = inventario.map((product) => {
      return fetch(`https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cantidad: product.cantidad }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            console.log(data.message); // Imprimir el mensaje de éxito
          } else {
            console.error(data.error); // Imprimir el mensaje de error
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    const axiosInstance = axios.create({
      baseURL: "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api",
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // Actualizar el registro diario del cliente en la base de datos
    try {
      await axiosInstance.post("/registro/daily", {
        id: infoClientSelected.id,
      });
      const data = Object.keys(registro).reduce((acc, key) => {
        if (key.endsWith("_out")) {
          acc[key.slice(0, -3)] = registro[key];
        }
        return acc;
      }, {});
      // Enviar los datos
      await axiosInstance.post("/registro/daily", data);

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const response = await axios.get(
          `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/registro/daily/search/id/${infoClientSelected.id}`
        );
        const { garrafa, fardo, pet } = response.data;
        console.log(response.data);
        console.log(error.response);
        console.log(error.response.status);

        // Sumar los datos con los correspondientes en registro que terminan en _in
        const newData = {
          garrafa: garrafa + (registro.garrafa_in || 0),
          fardo: fardo + (registro.fardo_in || 0),
          pet: pet + (registro.pet_in || 0),
        };

        // Enviar los nuevos valores sumados
        await axios.put(
          `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/registro/daily/${infoClientSelected.id}`,
          newData
        );
      }
    }

    Promise.all(updatePromises)
      .then(() => {
        // Limpiar las variables
        setInventario([]);
        setRegistro({});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(registro);
  console.log(infoClientSelected);
  console.log(infoClients);
  console.log(selectedOption);
  console.log(inventario);
  return (
    <div>
      <section class=" py-1 bg-blueGray-50">
        <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div class="rounded-t bg-white mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-blueGray-700 text-xl font-bold">
                  Control de Ventas
                </h6>
                <button
                  class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-3  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() =>
                    navigate("/admin-dashboard/facturacion/generate", {
                      state: { id: selectedOption },
                    })
                  }
                >
                  Generar Factura
                </button>
              </div>
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del cliente
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        N° de referencia
                      </label>
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
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
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Nombre del cliente
                      </label>
                      <input
                        type="name"
                        class="border-0 px-3 py-3 opacity-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={
                          infoClientSelected?.nombre +
                          " " +
                          infoClientSelected?.apellido
                        } //cambiar por props
                        disabled
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        N° de telefono
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 opacity-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={infoClientSelected?.telefono} //cambiar por props
                        disabled
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Documento de identidad
                      </label>
                      <input
                        type="number"
                        class="border-0 opacity-50 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={infoClientSelected?.n_documento} //cambiar por props
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <hr class="mt-6 border-b-1 border-blueGray-300" />

                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de productos de entrada
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4"></div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Garrafones
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="garrafa_in"
                        value={registro?.garrafa_in || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Fardos
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="fardo_in"
                        value={registro?.fardo_in || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Pet
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="pet_in"
                        value={registro?.pet_in || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <hr class="mt-6 border-b-1 border-blueGray-300" />

                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de productos salida
                </h6>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4"></div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Garrafones
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="garrafa_out"
                        value={registro?.garrafa_out || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Fardos
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="fardo_out"
                        value={registro?.fardo_out || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Pet
                      </label>
                      <input
                        type="number"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="pet_out"
                        value={registro?.pet_out || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-3 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
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
