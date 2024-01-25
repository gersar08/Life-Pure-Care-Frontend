import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetRequest from "../../Hooks/useGetRequest";
import { toast, ToastContainer } from "react-toastify";

function Users() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const [setError] = useState(null);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    id: "",
    unique_id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    n_documento: "",
  });

  // Usamos el hook UseGetRequest para la solicitud GET
  const { data } = useGetRequest(`clientes`);
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
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/clientes/${userId}`,
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
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }

    toast.success("Usuario eliminado con éxito", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <ToastContainer />
      <div className="text-gray-900 bg-gray-200 ">
        <div className="p-4 flex justify-between">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <button
            className="text-md mr-3 bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/admin-dashboard/clientes/create-client")}
          >
            Agregar Cliente
          </button>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">N° de Referencia</th>
                <th className="text-left p-3 px-5">Nombre</th>
                <th className="text-left p-3 px-5">Telefono</th>
                <th className="text-left p-3 px-5">DUI</th>
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
                        value={user.unique_id}
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
                        value={user.nombre + " " + user.apellido}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        className="bg-transparent"
                        max={9}
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.n_documento}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            n_documento: e.target.value,
                          })
                        }
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-sm mr-10 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          dataSlot="icon"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
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
