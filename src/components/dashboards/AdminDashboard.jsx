import React, { useState } from "react";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [showPopover, setShowPopover] = useState(false);

  const handleClick = () => {
    setShowPopover(true);
    setTimeout(() => setShowPopover(false), 3000); // 3000ms = 3s
  }

  return (
    <div className="p-6 bg-sky-500 text-white rounded-md opacity-70">
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de control</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to={"/admin-dashboard/usuarios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
        >
          <UsersIcon className="h-10 w-10 mb-2" />
          Usuarios
        </Link>
        <Link
          to={"/admin-dashboard/inventario"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
        >
          <BuildingStorefrontIcon className="h-10 w-10 mb-2" />
          Inventario
        </Link>
        <Link
          to={"/admin-dashboard/facturacion"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
        >
          <DocumentTextIcon className="h-10 w-10 mb-2" />
          Facturación
        </Link>
        <div className="relative">
          <button
            className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
            onClick={handleClick}
          >
            <ChartBarIcon className="h-10 w-10 mb-2" />
            Informe Financiero
          </button>
          {showPopover && (
            <div className="absolute z-10 w-64 p-2 mt-2 text-sm bg-amber-500 border rounded-xl shadow-lg">
              <h3 className="font-bold">Informe Financiero</h3>
              <p>El informe financiero está actualmente deshabilitado.</p>
            </div>
          )}
        </div>
        <Link
          to={"/admin-dashboard/clientes"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
        >
          <BriefcaseIcon className="h-10 w-10 mb-2" />
          Clientes
        </Link>
        <Link
          to={"/admin-dashboard/precios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
        >
          <CurrencyDollarIcon className="h-10 w-10 mb-2" />
          Precios
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
