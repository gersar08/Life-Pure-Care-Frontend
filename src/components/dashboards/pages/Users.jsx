import React, { useEffect, useState } from "react";
import UseGetRequest from "../../Hooks/UseGetRequest";
import UsePutRequest from "../../Hooks/UsePutRequest";
import UseDeleteRequest from "../../Hooks/UseDeleteRequest";
function Users() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState(null); // Nuevo estado para el mensaje

  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    name: "",
    user_name: "",
    password: "",
    role: "",
  });

  // Usamos el hook UseGetRequest para la solicitud GET
  const { data } = UseGetRequest(`users`);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleSave = (userId) => {
    const { error } = UsePutRequest(`users/${userId}`, formData);

    if (error) {
      setMessage("Error al guardar el usuario");
    } else {
      setMessage("Usuario guardado con éxito");
    }
  };

  const handleDelete = (userId) => {
    const { error } = UseDeleteRequest(`users/${userId}`);

    if (error) {
      setMessage("Error al eliminar el usuario");
    } else {
      setMessage("Usuario eliminado con éxito");
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 ">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <button className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          Agregar Usuario
        </button>
      </div>
      <div className="px-3 py-4 flex justify-center">
        {message && <p>{message}</p>} {/* Muestra el mensaje si existe */}
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
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.user_name}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
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
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleSave(user.id)}
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;

//TODO: Agregar el formulario para agregar usuarios