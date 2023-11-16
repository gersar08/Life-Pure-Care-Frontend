import React from 'react';
import Header from './components/Header';
import '../src/styles/App.css';
import Login from './components/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Facturation from './components/dashboards/pages/Facturation';
//import BalancePrev from './components/dashboards/pages/BalancePrev';
import Inventory from './components/dashboards/pages/Inventory';
import Users from './components/dashboards/pages/Users';
import Pricing from './components/dashboards/pages/Pricing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className='App-body'>
        <Login />
        <div className='Dashboard'>
        <AdminDashboard />
        { /* <BalancePrev /> */}
        <Facturation />
        <Inventory />
        <Pricing />
        <Users />
        </div>
      </div>
    </div>
  );
}

export default App;
