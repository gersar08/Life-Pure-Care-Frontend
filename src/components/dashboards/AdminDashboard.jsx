import React from "react";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Administrador</h1>
      <div className="grid grid-cols-2 gap-4">
        <button className="dashboard-button flex flex-col items-center justify-center p-4 border rounded-lg">
          <UsersIcon className="h-10 w-10 mb-2" />
          Usuarios
        </button>
        <button className="dashboard-button flex flex-col items-center justify-center p-4 border rounded-lg">
          <BuildingStorefrontIcon className="h-10 w-10 mb-2" />
          Inventario
        </button>
        <button className="dashboard-button flex flex-col items-center justify-center p-4 border rounded-lg">
          <DocumentTextIcon className="h-10 w-10 mb-2" />
          Facturación
        </button>
        <button className="dashboard-button flex flex-col items-center justify-center p-4 border rounded-lg">
          <ChartBarIcon className="h-10 w-10 mb-2" />
          Informe Financiero
        </button>
        <button className="dashboard-button flex flex-col items-center justify-center p-4 border rounded-lg">
          <BriefcaseIcon className="h-10 w-10 mb-2" />
          Clientes
        </button>
        <button className="dashboard-button flex flex-col items-center justify-center p-4 border rounded-lg">
          <CurrencyDollarIcon className="h-10 w-10 mb-2" />
          Precios
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
