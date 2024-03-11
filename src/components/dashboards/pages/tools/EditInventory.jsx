import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetRequest from "../../../Hooks/useGetRequest";
import axios from "axios";

export default function EditInventory() {
  const [productData, setProductData] = useState();
  const [formData, setFormData] = useState({
    product_name: "",
    cantidad: "",
    product_area: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const infoProduct = location.state ? location.state.itemId : null;
  const { data } = useGetRequest(`inventario/search/id/${infoProduct}`);
  useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toLowerCase(),
    }));
  };
  const handleCancel = (e) => {
    navigate(-1); // Navigate to the previous route
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario/${infoProduct}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin-dashboard/inventario", {
        state: { successMessage: "Producto actualizado con éxito" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full md:w-full py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">
              Editar Producto
            </h1>
            <p>Rellene todos los datos</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mx-3">
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label htmlFor="name" className="text-xs font-semibold px-1">
                  Nombre del Producto
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="product_name"
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder={productData ? productData.product_name : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label htmlFor="name" className="text-xs font-semibold px-1">
                  Cantidad
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="cantidad"
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder={productData ? productData.cantidad : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-5 ">
                <label htmlFor="name" className="text-xs font-semibold px-1">
                  Area del Producto
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="product_area"
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder={productData ? productData.product_area : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5 flex justify-center space-x-4">
                <button
                  type="submit"
                  className="block max-w-xs bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Actualizar Datos!
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="block max-w-xs bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
