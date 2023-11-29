import React from 'react';
import Header from './components/Header';
import '../src/styles/App.css';
import BalancePrev from './components/dashboards/pages/BalancePrev';
/*
import Inventory from './components/dashboards/pages/Inventory';
import Pricing from './components/dashboards/pages/Pricing';
import Users from './components/dashboards/pages/Users';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Login from './components/Login';
import Facturation from './components/dashboards/pages/Facturation';
*/
function App() {
  return (
    <div className="App">
      <header className="App-header md:flex  md:justify-between">
        <Header />
      </header>
      <div className="App-body md:flex md:flex-col md:items-center">
        <BalancePrev />
        { /*
        <Inventory />
        <Pricing />
        <Users />
        <AdminDashboard />
        <Login />
        <Facturation />
        */}
      </div>
    </div>
  );
}

export default App;
