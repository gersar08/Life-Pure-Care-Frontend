import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateNewUser = () => {
  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    n_documento: "",
    unique_id: "",
  });
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleConfirmClient = async (e) => {
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
        "http://127.0.0.1:8000/api/clientes",
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
    navigate("/admin-dashboard/clientes");
  }
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate("/admin-dashboard/clientes");
  };

  return (
    <div class="bg-transparent flex items-center justify-center w-screen h-screen">
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
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
          Ingrese cliente nuevo
        </h2>
        <p class="text-gray-600 text-center mb-6">
          Ingresa los detalles del cliente.
        </p>
        <form onSubmit={handleConfirmClient} className="w-full">
          <div class="flex mb-6">
            <div class="w-1/2 mr-2">
              <label
                for="nombre"
                class="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Ingrese el nombre"
                name="nombre"
                onChange={handleChange}
              />
            </div>
            <div class="w-1/2 ml-2">
              <label
                for="apellido"
                class="block text-gray-700 text-sm font-semibold mb-2"
              >
                Apellido *
              </label>
              <input
                type="text"
                id="apellido"
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Ingrese el apellido"
                name="apellido"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class=" flex mb-6">
            <div class="w-1/2 mr-2">
            <label
              for="user_name"
              class="block text-gray-700 text-sm font-semibold mb-2"
            >
              Telefono *
            </label>
            <input
              type="username"
              id="username"
              name="telefono"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              maxLength={8}
              placeholder="Telefono"
              onChange={handleChange}
            />
            </div>
            <div class="w-1/2 ml-2">
            <label
              for="n_documento"
              class="block text-gray-700 text-sm font-semibold mb-2"
              onChange={handleChange}
            >
              DUI *
            </label>
            <input
              type="text"
              id="n_documento"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              maxLength={9}
              placeholder="Ingrese DUI"
              name="n_documento"
              onChange={handleChange}
            />
          </div>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-gray-700 text-sm font-semibold mb-2"
            >
              Direccion *
            </label>
            <input
              type="text"
              id="password"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="calle, colonia, ciudad"
              name="direccion"
              onChange={handleChange}
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-700 text-sm font-semibold mb-2"
            >
              Codigo de referencia *
            </label>
            <input
              type="text"
              id="password"
              class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Unique ID"
              name="unique_id"
              onChange={handleChange}
            />
          </div>
          <div class="flex m-2">
          <button
            type="submit"
            class="w-1/2 mr-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
          <button
            onClick={handleCancel}
            type="back"
            class="w-1/2 ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
          </div>
        </form>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error.message}</p>}
        {response && <p>Respuesta: {JSON.stringify(response)}</p>}
      </div>
    </div>
  );
};

export default CreateNewUser;
