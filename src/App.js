import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import '../src/styles/App.css';
import Login from './components/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Users from './components/dashboards/pages/Users'
import Inventory from './components/dashboards/pages/Inventory';
import Pricing from './components/dashboards/pages/Pricing';
import Clients from './components/dashboards/pages/Clients';
import CreateNewUser from './components/dashboards/pages/tools/CreateNewUser';
import VentasControl from './components/dashboards/pages/VentasControl';
import CreateNewProduct from './components/dashboards/pages/tools/CreateNewProduct';
import NewClient from './components/dashboards/pages/tools/NewClient';
import UpdatePricing from './components/dashboards/pages/tools/UpdatePricing';
import PDFSelector from './components/dashboards/pages/tools/PDFSelector';
import EditUser from './components/dashboards/pages/tools/EditUser';
import EditInventory from './components/dashboards/pages/tools/EditInventory';
import PropTypes from 'prop-types';
import EditClient from './components/dashboards/pages/tools/EditClient';
import RegistroClientes from './components/dashboards/pages/RegistroClientes';
import EditClientRegister from './components/dashboards/pages/tools/EditClientRegister';

function ProtectedComponent({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
}

ProtectedComponent.propTypes = {
  children: PropTypes.node,
};
function App() {
  return (
    <Router>
      <div className="bg-gray-200 h-screen flex flex-col overflow-hidden">
        <header className="App-header md:flex  md:justify-between">
          <Header />
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} exactpath />
            <Route path="/admin-dashboard" element={<ProtectedComponent><AdminDashboard /></ProtectedComponent>} />
            <Route path='/admin-dashboard/usuarios' element={<ProtectedComponent><Users /></ProtectedComponent>} />
            <Route path='/admin-dashboard/inventario' element={<ProtectedComponent><Inventory /></ProtectedComponent>} />
            <Route path='/admin-dashboard/facturacion' element={<ProtectedComponent><VentasControl /></ProtectedComponent>} />
            <Route path='/admin-dashboard/precios' element={<ProtectedComponent><Pricing /></ProtectedComponent>} />
            <Route path='/admin-dashboard/clientes' element={<ProtectedComponent><Clients /></ProtectedComponent>} />
            <Route path='/admin-dashboard/usuarios/createuser' element={<ProtectedComponent><CreateNewUser /></ProtectedComponent>} />
            <Route path='/admin-dashboard/clientes/create-client' element={<ProtectedComponent><NewClient /></ProtectedComponent>} />
            <Route path='/admin-dashboard/inventario/create-product' element={<ProtectedComponent><CreateNewProduct /></ProtectedComponent>} />
            <Route path='/admin-dashboard/pricing/create-price' element={<ProtectedComponent><UpdatePricing /></ProtectedComponent>} />
            <Route path='/admin-dashboard/facturacion/generate' element={<ProtectedComponent><PDFSelector /></ProtectedComponent>} />
            <Route path='/admin-dashboard/usuarios/editarusuario' element={<ProtectedComponent><EditUser /></ProtectedComponent>} />
            <Route path='/admin-dashboard/inventario/editarproducto' element={<ProtectedComponent><EditInventory /></ProtectedComponent>} />
            <Route path='/admin-dashboard/inventario/editarcliente' element={<ProtectedComponent><EditClient /></ProtectedComponent>} />
            <Route path='/admin-dashboard/registro-ventas' element={<ProtectedComponent><RegistroClientes /></ProtectedComponent>} />
            <Route path='/admin-dashboard/registro-ventas/edit' element={<ProtectedComponent><EditClientRegister /></ProtectedComponent>} />

            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;