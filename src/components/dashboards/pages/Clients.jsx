import React from "react";

export default function Clients() {
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
            <tr class="border-b hover:bg-orange-100 bg-gray-100">
              <td class="p-3 px-5">
                <input type="text" value="user.name" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                <input type="text" value="user.email" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                <input type="text" value="user.email" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                <input type="text" value="user.email" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                <input type="text" value="user.email" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                <input type="text" value="user.email" class="bg-transparent" />
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
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
