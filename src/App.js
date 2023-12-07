import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import '../src/styles/App.css';
import Login from './components/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Users from './components/dashboards/pages/Users'
import Inventory from './components/dashboards/pages/Inventory';
import BalancePrev from './components/dashboards/pages/BalancePrev';
import Pricing from './components/dashboards/pages/Pricing';
import Clients from './components/dashboards/pages/Clients';
import CreateNewUser from './components/dashboards/pages/CreateNewUser';
import VentasControl from './components/dashboards/pages/VentasControl';

function App() {
  return (
    <Router>
      <div className="bg-gray-200 h-full flex flex-col">
        <header className="App-header md:flex  md:justify-between">
          <Header />
        </header>
        <div className="App-body lg:flex  md:flex md:items-center pt-12 w-full h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />}  exactpath/>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path='/admin-dashboard/users' element={<Users />} />
            <Route path='/admin-dashboard/inventario' element={<Inventory/>} />
            <Route path='/admin-dashboard/informe-financiero' element={<BalancePrev />}/>
            <Route path='/admin-dashboard/facturacion' element={<VentasControl />} />
            <Route path='/admin-dashboard/precios' element={<Pricing />} />
            <Route path='/admin-dashboard/clientes' element={<Clients />} />
            <Route path='/admin-dashboard/usuarios/createuser' element={<CreateNewUser />} />
            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;