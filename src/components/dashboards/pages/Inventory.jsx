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
          "http://localhost:8000/api/inventario",
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
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8000/api/inventario/${inventoryDataId}`, {  //todo: Propar en postman

            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

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
        console.log(error)
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
        <h1 class="text-3xl">Producto</h1>
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
                    type="button"
                    class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                  <button
                      onClick={() => handleDelete(item.id)}
                      className="text-sm mr-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Eliminar
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
