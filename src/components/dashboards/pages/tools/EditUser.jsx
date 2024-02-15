import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetRequest from "../../../Hooks/useGetRequest";
import axios from "axios";

export default function EditUser() {
  const [clientData, setClientData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    user_name: "",
    role: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const infoClient = location.state ? location.state.userId : null;

  const { data } = useGetRequest(`users/search/id/${infoClient}`);
  useEffect(() => {
    if (data) {
      setClientData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const updatedFormData = {
      name: formData?.name || "",
      user_name: formData?.user_name || "",
    };
  };
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: value,
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
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/users/${infoClient}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin-dashboard/usuarios", {
        state: { successMessage: "Usuario actualizado con éxito" },
      });
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
            <h1 className="font-bold text-3xl text-gray-900">Editar Usuario</h1>
            <p>Rellene todos los datos</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label
                  className="text-xs ml-5 font-semibold px-1"
                >
                  Rol
                </label>
                <div className="flex">
                  <select
                    name="selectedRole"
                    className="w-full ml-5 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    onChange={handleSelectChange}
                  >
                    <option value="">Rol</option>
                    <option value="Admin">Administrador</option>
                    <option value="Operador de Produccion">Operador de Produccion</option>
                    <option value="Supervisor de Inventario">
                      Supervisor de Inventario
                    </option>
                    <option value="Operador de Caja">Operador de caja</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Nombre
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="name"
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder={clientData ? clientData.name : ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-5 ml-3">
                <label  className="text-xs font-semibold px-1">
                  Username
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="user_name"
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder={clientData ? clientData.user_name : ""}
                    onChange={handleChange}
                    required
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
