import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetRequest from "../../Hooks/useGetRequest";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function RegistroClientes() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { successMessage } = location.state || {};
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const showToastOnLoad = localStorage.getItem("showToastOnLoad");
    if (showToastOnLoad) {
      // Aquí es donde mostrarías tu toast. Esto es solo un ejemplo.
      toast.success("Cierre de caja exitoso", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Luego, elimina la bandera del localStorage.
      localStorage.removeItem("showToastOnLoad");
    }
  }, []);

  // Usamos el hook UseGetRequest para la solicitud GET
  const { data } = useGetRequest(`registro/daily/view`);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleEdit = (userId) => {
    navigate(`/admin-dashboard/registro-ventas/edit`, {
      state: { userId },
    });
  };

  const handleDeleteTable = async () => {
    try {
      await axios.delete(
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/registro/content`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // Guarda una bandera en localStorage para mostrar el toast después de la recarga
      localStorage.setItem("showToastOnLoad", true);

      window.location.reload();

      // Realiza alguna acción después de eliminar el usuario
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      // Maneja el error de alguna manera
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="text-gray-900 bg-gray-200 ">
        <div className="p-4 flex justify-between">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <button
            className="text-md mr-3 bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDeleteTable}
            disabled={localStorage.getItem('rol') !== 'admin' || localStorage.getItem('rol') !== 'Operador de caja'}

         >
            Cierre de caja
          </button>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Cliente ID</th>
                <th className="text-left p-3 px-5">Fardo</th>
                <th className="text-left p-3 px-5">Garrafa</th>
                <th className="text-left p-3 px-5">Pet</th>
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
                        value={user.cliente_id}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="number"
                        value={user.fardo}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="number"
                        value={user.garrafa}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="number"
                        value={user.pet}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(user.cliente_id)}
                        className="text-sm bg-blue-500 hover:bg-blue-800 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outliine mr-5"
                      >
                        <PencilSquareIcon className="w-6 h-6" />
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

