import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateNewUser = () => {
  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    name: "",
    user_name: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const handleConfirmUser = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        body: JSON.stringify(formData),
      };

      const apiResponse = await fetch(
        "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/users",
        requestOptions
      );
      const jsonData = await apiResponse.json();

      setResponse(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  if (response && !error) {
    navigate(-1);
  }
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div class="bg-transparent flex items-center justify-center w-screen h-screen">
      <div class="bg-white p-12 rounded-lg shadow-lg max-w-sm w-full">
        <div class="flex justify-center mb-6">
          <span class="inline-block bg-gray-200 rounded-full p-3">
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
        <h2 class="text-2xl font-semibold text-center mb-4">
          Crea un nuevo usuario
        </h2>
        <p class="text-gray-600 text-center mb-6">
          Ingresa los detalles del registro.
        </p>
        <form onSubmit={handleConfirmUser}>
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-700 text-sm font-semibold mb-2"
            >
              Nombre Completo *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="James Brown"
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label
              for="user_name"
              class="block text-gray-700 text-sm font-semibold mb-2"
            >
              Usuario *
            </label>
            <input
              type="username"
              id="username"
              name="user_name"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Usuario"
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contraseña *
            </label>
            <input
              type="password"
              id="password"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="••••••••"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div class="mb-6">
            <label
              for="role"
              class="block text-gray-700 text-sm font-semibold mb-2"
              onChange={handleChange}
            >
              Rol *
            </label>
            <input
              type="string"
              id="role"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Ingrese un rol"
              name="role"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            class="w-full mb-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
          <button
            onClick={handleCancel}
            type="back"
            class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </form>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error.message}</p>}
        {response && <p>Respuesta: {JSON.stringify(response)}</p>}
      </div>
    </div>
  );
};

export default CreateNewUser;
