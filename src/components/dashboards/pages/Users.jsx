import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetRequest from "../../Hooks/useGetRequest";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";

function Users() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const [setIsLoading] = useState(false);
  const [setError] = useState(null);
  const token = localStorage.getItem("token");
  const [setInfo] = useState(null);
  const location = useLocation();
  const { successMessage } = location.state || {};
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    user_name: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [successMessage]);

  const { data } = useGetRequest(`users`);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleEdit = (userId) => {
    navigate(`/admin-dashboard/usuarios/editarusuario`, { state: { userId } });
  };

  const handleDelete = async (userId) => {
    setIsLoading(true);
    setError(null);
    console.log(userId);
    try {
      const response = await fetch(
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setInfo(responseData);
    } catch (error) {
      toast.error(
        { error },
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
    toast.success("Usuario eliminado con éxito", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <ToastContainer />
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
                          setFormData({
                            ...formData,
                            user_name: e.target.value,
                          })
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
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-sm bg-blue-500 hover:bg-blue-800 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outliine mr-5"
                      >
                        <PencilSquareIcon className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-sm mr-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
