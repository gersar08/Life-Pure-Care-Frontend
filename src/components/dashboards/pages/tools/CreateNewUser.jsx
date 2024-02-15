import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateNewUser = () => {
  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    name: "",
    user_name: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleConfirmUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/users",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(-1, {
        state: { successMessage: "Usuario creado con éxito" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: value,
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-transparent flex items-center justify-center w-screen h-screen">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-sm w-full">
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
          Crea un nuevo usuario
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ingresa los detalles del registro.
        </p>
        <form onSubmit={handleConfirmUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="James Brown"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Usuario *
            </label>
            <input
              type="username"
              id="username"
              name="user_name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Usuario"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="••••••••"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              onChange={handleChange}
            >
              Rol *
            </label>
            <select
              name="selectedRole"
              className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              onChange={handleSelectChange}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador</option>
              <option value="Operador de Produccion">
                Operador de Produccion
              </option>
              <option value="Supervisor de Inventario">
                Supervisor de Inventario
              </option>
              <option value="Operador de caja">Operador de caja</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mb-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
          <button
            onClick={handleCancel}
            type="back"
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
