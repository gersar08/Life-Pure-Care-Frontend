import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateNewProduct() {
  const [formData, setFormData] = useState({
    producto_name: "",
    precio_base: "",
  });

  const [existingProducts, setExistingProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  console.log(existingProducts);
  useEffect(() => {
    // Fetch existing products when the component mounts
    const fetchExistingProducts = async () => {
      try {
        const response = await axios.get(
          "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/productos",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setExistingProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExistingProducts();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event) => {
    setSelectedProductId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (selectedProductId) {
        // If a product is selected, perform a PUT request
        const response = await axios.put(
          `https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/productos/${selectedProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      } else {
        // If no product is selected, perform a POST request
        const response = await axios.post(
          "https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/productos",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-full md:w-full py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">
              Crear Nuevo Precio
            </h1>
            <p>Rellene todos los datos</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex -mx-3"></div>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label
                  htmlFor="producto_name"
                  className="text-xs ml-5 font-semibold px-1"
                >
                  Producto
                </label>
                <div className="flex">
                  <select
                    name="selectedProductId"
                    className="w-full ml-5 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    onChange={handleSelectChange}
                  >
                    <option value="">Producto</option>
                    {existingProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.producto_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-1/2 px-3 mb-12">
                <label
                  htmlFor="precio_base"
                  className="text-xs font-semibold px-1"
                >
                  Precio
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    name="precio_base"
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="5.60"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Registrar Producto!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
