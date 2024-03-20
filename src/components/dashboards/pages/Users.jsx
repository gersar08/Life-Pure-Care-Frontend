import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetRequest from "../../Hooks/useGetRequest";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function Users() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("userIdLogged");
  const [setInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Number of items to display per page

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
    if (parseInt(idUser) === parseInt(userId)) {
      toast.error("No puedes eliminar el usuario actual", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
              {currentItems.map((user) => (
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
        <Pagination
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Users;
