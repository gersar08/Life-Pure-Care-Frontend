import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetRequest from "../../../Hooks/useGetRequest";
import axios from "axios";

export default function EditClient() {
  const [clienteData, setClienteData] = useState();
  const [formData, setFormData] = useState({
    id: "",
    unique_id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    n_documento: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const infoClient = location.state ? location.state.userId : null;
  const { data } = useGetRequest(`clientes/search/id/${infoClient}`);
  useEffect(() => {
    if (data) {
      setClienteData(data);
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCancel = (e) => {
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/clientes/${infoClient}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin-dashboard/clientes", {
        state: { successMessage: "Cliente actualizado con éxito" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-transparent flex items-center justify-center w-screen h-screen">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Actualice datos del cliente
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ingresa los detalles del cliente.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex mb-6">
            <div className="w-1/2 mr-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder={clienteData ? clienteData.nombre : ""}
                name="nombre"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Apellido *
              </label>
              <input
                type="text"
                id="apellido"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder={clienteData ? clienteData.apellido : ""}
                name="apellido"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" flex mb-6">
            <div className="w-1/2 mr-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Telefono *
              </label>
              <input
                type="username"
                id="username"
                name="telefono"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                maxLength={8}
                placeholder={clienteData ? clienteData.telefono : ""}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                onChange={handleChange}
              >
                DUI *
              </label>
              <input
                type="text"
                id="n_documento"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                maxLength={9}
                placeholder={clienteData ? clienteData.n_documento : ""}
                name="n_documento"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Direccion *
            </label>
            <input
              type="text"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder={clienteData ? clienteData.direccion : ""}
              name="direccion"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Codigo de referencia *
            </label>
            <input
              type="text"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder={clienteData ? clienteData.unique_id : "" }
              name="unique_id"
              onChange={handleChange}
            />
          </div>
          <div className="flex m-2">
            <button
              type="submit"
              className="w-1/2 mr-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Actualizar Datos
            </button>
            <button
              onClick={handleCancel}
              type="back"
              className="w-1/2 ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
