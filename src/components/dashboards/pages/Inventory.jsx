
import { useState, useEffect } from "react";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch products from backend and set them to state
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    // delete product from backend and remove it from state
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = async (id, field, value) => {
    // update product in backend and state
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleCreate = async () => {
    // create new product in backend and add it to state
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", quantity: 0, price: 0 }),
    });
    const data = await response.json();
    setProducts([...products, data]);
  };

  return (
    <div>
      <button onClick={handleCreate}>Crear nuevo producto</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleEdit(product.id, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    handleEdit(product.id, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
