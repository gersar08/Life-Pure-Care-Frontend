import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateNewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    product_area: "",
    cantidad: "",
  });
  const token = localStorage.getItem("token");
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
       await axios.post(
        "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-full md:w-full py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">Crear Producto</h1>
            <p>Rellene todos los datos para crear el producto</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Nombre
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    id="product_name"
                    type="text"
                    name="product_name"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Fardos"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label  className="text-xs font-semibold px-1">
                  Area de uso
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    id="product_area"
                    name="product_area"
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Limpieza, Produccion, etc"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-1/2 px-3 mb-12">
                <label className="text-xs font-semibold px-1">
                  Cantidad
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    id="cantidad"
                    name="cantidad"
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="100"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Registrar Producto!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
