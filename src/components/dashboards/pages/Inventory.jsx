import React from "react";

export default function Inventory() {
  return (
    <div class="text-gray-900 bg-gray-200">
      <div class="p-4 flex justify-between">
        <h1 class="text-3xl">Producto</h1>
        <button className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
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
            <tr class="border-b hover:bg-orange-100 bg-gray-100">
              <td class="p-3 px-5">
                <input type="text" value="productName" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                <input type="text" value="Quantity" class="bg-transparent" />
              </td>
              <td class="p-3 px-5">
                        <select value="user.role" class="bg-transparent">
                            <option value="user">Production</option>
                            <option value="admin">Clean</option>
                        </select>
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
