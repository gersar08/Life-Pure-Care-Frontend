import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetRequest from "../../Hooks/useGetRequest";

function Users() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    id: "",
    name: "",
    user_name: "",
    password: "",
    role: "",
  });

  // Usamos el hook UseGetRequest para la solicitud GET
  const { data } = useGetRequest(`users`);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleDelete = async (userId) => {
    setIsLoading(true);
    setError(null);
    console.log(userId);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar los datos");
      }

      const responseData = await response.json();
      setInfo(responseData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
    setNotification("Usuario eliminado con éxito");
    console.log(isLoading, error, info);
    setUsers(users.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000); // Desaparece después de 5 segundos

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [notification]);
  return (
    <div className="text-gray-900 bg-gray-200 ">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <button
          className="text-md mr-3 bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate("/admin-dashboard/usuarios/createuser")}
        >
          Agregar Usuario
        </button>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Nombre</th>
              <th className="text-left p-3 px-5">Usuario</th>
              <th className="text-left p-3 px-5">Contraseña</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-orange-100 bg-gray-100"
                >
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-transparent"
                      disabled
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.user_name}
                      onChange={(e) =>
                        setFormData({ ...formData, user_name: e.target.value })
                      }
                      className="bg-transparent"
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="password"
                      value="password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="bg-transparent"
                      max={8}
                      disabled
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="bg-transparent"
                      disabled
                    />
                  </td>
                  <td>
                    <button onClickk={() => navigate("/admin-dashboard/usuarios/edit-user")} className="text-sm m-4 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                      Modificar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm mr-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {notification && (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">AVISO!</strong>
            <span class="block sm:inline"> {notification}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
    </div>
  );
}

export default Users;
