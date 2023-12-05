import React from "react";
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Administrador</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to={"/admin-dashboard/users"} className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200">
          <UsersIcon className="h-10 w-10 mb-2" />
          Usuarios
        </Link>
        <Link to={"/admin-dashboard/inventario"} className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200">
          <BuildingStorefrontIcon className="h-10 w-10 mb-2" />
          Inventario
        </Link>
        <Link to={"/admin-dashboard/facturacion"} className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200">
          <DocumentTextIcon className="h-10 w-10 mb-2" />
          Facturación
        </Link>
        <Link to={"/admin-dashboard/informe-financiero"} className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200">
          <ChartBarIcon className="h-10 w-10 mb-2" />
          Informe Financiero
        </Link>
        <Link to={"/admin-dashboard/clientes"} className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200">
          <BriefcaseIcon className="h-10 w-10 mb-2" />
          Clientes
        </Link>
        <Link to={"/admin-dashboard/precios"} className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200">
          <CurrencyDollarIcon className="h-10 w-10 mb-2" />
          Precios
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
