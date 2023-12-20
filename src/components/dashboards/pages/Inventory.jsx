import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Inventory() {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [notification, setNotification] = useState(null);
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
        console.error(error);
      }
    };

    fetchData();
  }, [token]);
  const handleDelete = async (inventoryDataId) => {
    setIsLoading(true);
    setError(null);

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
        throw new Error("Error al eliminar los datos");
      }

      setNotification("Usuario eliminado con éxito");
      console.log(response.data);
      setInventoryData(
        inventoryData.filter((inventory) => inventory.id !== inventoryDataId)
      );
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

    setIsLoading(false);
    console.log(isLoading, error);
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
    <div class="text-gray-900 bg-gray-200">
      <div class="p-4 flex justify-between">
        <h1 class="text-3xl">Inventario</h1>
        <button
          onClick={() => navigate("/admin-dashboard/inventario/create-product")}
          className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Nuevo Item
        </button>
      </div>
      <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr class="border-b">
              <th class="text-left p-3 px-5">Nombre del Producto</th>
              <th class="text-left p-3 px-5">Cantidad</th>
              <th class="text-left p-3 px-5">Area de Uso</th>
              <th class="text-left p-3 px-5"></th>
            </tr>
            {inventoryData.map((item) => (
              <tr
                class="border-b hover:bg-orange-100 bg-gray-100"
                key={item.id}
              >
                <td class="p-3 px-5">
                  <input
                    type="text"
                    name="product_name"
                    value={item.product_name}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5">
                  <input
                    type="text"
                    name="cantidad"
                    value={item.cantidad}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5">
                  <input
                    type="text"
                    name="product_area"
                    value={item.product_area}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5 flex justify-end">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm mr-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
    </div>
  );
}
