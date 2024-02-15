import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

export default function Inventory() {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { successMessage } = location.state || {};

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInventoryData(response.data);
      } catch (error) {
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    };

    fetchData();
  }, [token]);
  const handleDelete = async (inventoryDataId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario/${inventoryDataId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        toast.error("Error al eliminar los datos", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
      }
      toast.success("Item eliminado con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      setInventoryData(
        inventoryData.filter((inventory) => inventory.id !== inventoryDataId)
      );
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
  const handleEdit = (itemId) => {
    navigate(`/admin-dashboard/inventario/editarproducto  `, {
      state: { itemId },
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex justify-between">
          <h1 className="text-3xl">Inventario</h1>
          <button
            onClick={() =>
              navigate("/admin-dashboard/inventario/create-product")
            }
            className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Nuevo Item
          </button>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Nombre del Producto</th>
                <th className="text-left p-3 px-5">Cantidad</th>
                <th className="text-left p-3 px-5">Area de Uso</th>
                <th className="text-left p-3 px-5"></th>
              </tr>
              {inventoryData.map((item) => (
                <tr
                  className="border-b hover:bg-orange-100 bg-gray-100"
                  key={item.id}
                >
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      name="product_name"
                      value={item.product_name}
                      className="bg-transparent"
                      disabled
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      name="cantidad"
                      value={item.cantidad}
                      className="bg-transparent"
                      disabled
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      name="product_area"
                      value={item.product_area}
                      className="bg-transparent"
                      disabled
                    />
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-sm bg-blue-500 hover:bg-blue-800 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outliine mr-5"
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
