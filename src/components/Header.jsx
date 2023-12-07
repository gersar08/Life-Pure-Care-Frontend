import React from "react";
import {BellAlertIcon, ArrowLeftOnRectangleIcon, HomeIcon} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    // Haz una solicitud a la ruta /logout de tu API
    const response = await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      // Borra la información de la sesión del usuario
      localStorage.removeItem('token');
      // Redirige al usuario a la página de inicio de sesión
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-sky-500">
      <div className="flex items-center">
        <Link to={"/admin-dashboard"}>
        <h1 className="text-xl font-bold">Life Care Pure</h1>
        </Link>
      </div>
      <div className="flex items-center">
      {location.pathname !== '/login' && (
        <>
          <button>
            <BellAlertIcon className="h-7 w-7 mr-6" />
          </button>
          <Link to={'/admin-dashboard'} className="h-7 w-7 mr-6"><HomeIcon /> </Link>
        </>
      )}
        <button id="logout" onClick={handleLogout}>
        <ArrowLeftOnRectangleIcon className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
};

export default Header;
