import React from 'react';
import '../../styles/dashboard.css';

function AdminDashboard() {
  return (
    <div>
      <h1>Dashboard de Administrador</h1>
      <div className="button-container">
        <button className="dashboard-button">Usuarios</button>
        <button className="dashboard-button">Inventario</button>
        <button className="dashboard-button">Facturación</button>
        <button className="dashboard-button">Informe Financiero</button>
        <button className="dashboard-button">Clientes</button>
        <button className="dashboard-button">Precios</button>
      </div>
    </div>
  );
}

export default AdminDashboard;

//TODO 1: agregar los iconos a cada boton del dashborard
