import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetRequest from "../../../Hooks/useGetRequest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function EditClientRegister() {
  const [existingProducts, setExistingProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const clientID = location.state ? location.state.userId : null;
  const { data } = useGetRequest(`registro/daily/search/${clientID}`);

  useEffect(() => {
    if (data) {
      setExistingProducts(data);
    }
  }, [data]);

  // Manejador para el evento de cambio del select
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  // Manejador para el evento de cambio del input
  const handleValueChange = (e) => {
    if (selectedProduct) {
      setExistingProducts((prevProducts) => {
        return { ...prevProducts, [selectedProduct]: e.target.value };
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/registro/daily/${clientID}`,
        existingProducts,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/admin-dashboard/registro-ventas", {
          state: { successMessage: "Registro actualizado con éxito" },
        });
      } else {
        toast.error("Error al actualizar los productos", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-full md:w-full py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">
              Actualizar Registros
            </h1>
            <p>Rellene todos los datos</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex -mx-3"></div>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label
                  htmlFor="producto_name"
                  className="text-xs ml-5 font-semibold px-1"
                >
                  Producto
                </label>
                <div className="flex">
                  <select
                    name="selectedProductId"
                    className="w-full ml-5 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    onChange={handleProductChange}
                  >
                    <option value="">Producto</option>
                    <option value="fardo">Fardo</option>
                    <option value="garrafa">Garrafa</option>
                    <option value="pet">Pet</option>
                  </select>
                </div>
              </div>
              <div className="w-1/2 px-3 mb-12">
                <label
                  htmlFor="precio_base"
                  className="text-xs font-semibold px-1"
                >
                  Precio
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="cantidad"
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Ingrese la cantidad"
                    onChange={handleValueChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5 flex justify-center space-x-4">
                <button
                  type="button"
                  className="block w-full max-w-xs mx-auto bg-lime-500 hover:bg-lime-700 focus:bg-lime-700 text-white rounded-lg px-3 py-3 font-semibold"
                  onClick={() => {
                    toast.success("Producto actualizado con éxito", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    return true;
                  }}
                >
                  Actualizar Producto
                </button>
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Regresar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
