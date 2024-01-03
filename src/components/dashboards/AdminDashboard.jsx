import React, { useEffect, useState } from "react";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {
  const token = localStorage.getItem("token");
  const [toastShown, setToastShown] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
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

  return (
    <div className="p-5 h-90 bg-sky-500 text-white rounded-md opacity-70 w-3/8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de control</h1>
      <div className="grid grid-cols-3 gap-2 relative w-80">
        <Link
          to={"/admin-dashboard/usuarios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-blue-200"
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
          <Link
            to={"/admin-dashboard/clientes"}
            className="bg-indigo-300 flex flex-col items-center justify-center p-4 border-4 rounded-lg bg-transparent hover:bg-blue-200"
          >
            <BriefcaseIcon className="h-10 w-10 mb-2" />
            Clientes
          </Link>
        </div>
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
