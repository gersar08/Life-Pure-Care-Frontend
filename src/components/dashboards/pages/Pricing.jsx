import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetRequest from "../../Hooks/useGetRequest";

export default function Pricing() {
  // Definimos 'users' y 'setUsers' usando 'useState'
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Para enviar los datos del formulario
    id: "",
    producto_name: "",
    precio_base: "",
  });

  // Usamos el hook UseGetRequest para la solicitud GET
  const { data } = useGetRequest(`productos`);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return (
    <div className="text-gray-900 bg-gray-200 ">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl font-bold">Precios</h1>
        <button
          className="text-md bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate("/admin-dashboard/pricing/create-price")}
        >
          Agregar Precio de Producto
        </button>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Nombre del producto</th>
              <th className="text-center p-3 px-5">Precio</th>
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
                      value={user.producto_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          producto_name: e.target.value,
                        })
                      }
                      className="bg-transparent text-center"
                    />
                  </td>
                  <td className="p-3 px-5">
                    <input
                      type="text"
                      value={user.precio_base}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          precio_base: e.target.value,
                        })
                      }
                      className="bg-transparent text-center"
                      max={9}
                      disabled
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
