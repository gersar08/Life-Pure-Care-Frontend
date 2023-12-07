import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Clients() {
  const [clients, setClients] = useState({
    unique_id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    n_documento: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/clientes");
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div class="text-gray-900 bg-gray-200">
      <div class="p-4 flex justify-between">
        <h1 class="text-3xl">Clientes</h1>
        <button className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          Agregar Nuevo Cliente
        </button>
      </div>
      <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr class="border-b">
              <th class="text-left p-3 px-5">Codigo de referencia</th>
              <th class="text-left p-3 px-5">Nombre</th>
              <th class="text-left p-3 px-5">Email</th>
              <th class="text-left p-3 px-5">Telefono</th>
              <th class="text-left p-3 px-5">DUI</th>
              <th class="text-left p-3 px-5">NIT</th>
              <th></th>
            </tr>
            {clients.map((client) => (
              <tr
                class="border-b hover:bg-orange-100 bg-gray-100"
                key={client.unique_id}
              >
                <td class="p-3 px-5">
                  <input
                    type="text"
                    value={client.nombre}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5">
                  <input
                    type="text"
                    value={client.apellido}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5">
                  <input
                    type="text"
                    value={client.telefono}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5">
                  <input
                    type="text"
                    value={client.direccion}
                    class="bg-transparent"
                    disabled
                  />
                </td>
                <td class="p-3 px-5">
                  <input
                    type="text"
                    value={client.n_documento}
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
                    type="button"
                    class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
