import React, { useEffect, useState } from "react";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetRequest from "./../Hooks/useGetRequest";

function AdminDashboard() {
  const token = localStorage.getItem("token");
  const [toastShown, setToastShown] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const username = localStorage.getItem("user");
  useEffect(() => {
    if (
      localStorage.getItem("rol") === "admin" ||
      localStorage.getItem("rol") === "Supervisor de Inventario" ||
      localStorage.getItem("rol") === "Operador de Caja" ||
      localStorage.getItem("rol") === "Operador de Caja"
    ) {
      const fetchData = async () => {
        const response = await axios.get(
          "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/inventario",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        const lowStock = data.filter(
          (product) =>
            (product.product_name === "garrafa" ||
              product.product_name === "fardo" ||
              product.product_name === "pet") &&
            product.cantidad < 1000
        );

        setLowStockProducts(lowStock);
      };
      fetchData();
    }
  }, [token]);
  useEffect(() => {
    if (lowStockProducts.length > 0 && !toastShown) {
      toast.error("Hay productos con stock bajo, revisar el inventario", {
        duration: 10000,
        position: "top-center",
      });
      setToastShown(true);
    }
  }, [lowStockProducts, toastShown]);

  const { data: userData } = useGetRequest(
    `users/search/user_name/${username}`
  );

  useEffect(() => {
    // Ahora puedes usar 'userData' dentro de este hook
    if (userData) {
      localStorage.setItem("rol", userData.role);
    }
  }, [userData]);

  return (
    <div className="p-5 h-90 mb-16 w-3/6 bg-sky-500 text-white rounded-md opacity-70 w-3/8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de control</h1>
      <div className="grid grid-cols-2 gap-4 relative w-90">
        <Link
          to={"/admin-dashboard/usuarios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <UsersIcon className="h-10 w-10 mb-2" />
          Usuarios
        </Link>
        <Link
          to={"/admin-dashboard/inventario"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          onClick={(event) => {
            if (
              localStorage.getItem("rol") !== "admin" &&
              localStorage.getItem("rol") !== "Supervisor de Inventario"
            ) {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <BuildingStorefrontIcon className="h-10 w-10 mb-2" />
          Inventario
        </Link>
        <Link
          to={"/admin-dashboard/facturacion"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          onClick={(event) => {
            if (
              localStorage.getItem("rol") !== "admin" &&
              localStorage.getItem("rol") !== "Operador de Caja" &&
              localStorage.getItem("rol") !== "Operador de Producción"
            ) {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <DocumentTextIcon className="h-10 w-10 mb-2" />
          Facturación
        </Link>

        <Link
          to={"/admin-dashboard/clientes"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <BriefcaseIcon className="h-10 w-10 mb-2" />
          Clientes
        </Link>
        <Link
          to={"/admin-dashboard/precios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <CurrencyDollarIcon className="h-10 w-10 mb-2" />
          Precios
        </Link>
        <Link
          to={"/admin-dashboard/registro-ventas"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <ClipboardDocumentListIcon className="h-10 w-10 mb-2" />
          <div className="flex justify-center items-center">
            Registro Ventas
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
