
import React, { useState } from "react";

const Pricing = () => {
  const [customerName, setCustomerName] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleReferenceCodeChange = (event) => {
    setReferenceCode(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    // Set the price based on the selected product
    switch (event.target.value) {
      case "Product A":
        setProductPrice(10);
        break;
      case "Product B":
        setProductPrice(20);
        break;
      case "Product C":
        setProductPrice(30);
        break;
      default:
        setProductPrice("");
        break;
    }
  };
  console.log(customerName, referenceCode, selectedProduct, productPrice)

  return (
    <div>
      <h1>Pricing Table</h1>
      <form>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={customerName}
          onChange={handleCustomerNameChange}
        />
        <br />
        <label htmlFor="referenceCode">Reference Code:</label>
        <input
          type="text"
          id="referenceCode"
          name="referenceCode"
          value={referenceCode}
          onChange={handleReferenceCodeChange}
        />
        <br />
        <label htmlFor="product">Product:</label>
        <select id="product" name="product" onChange={handleProductChange}>
          <option value="">Select a product</option>
          <option value="Product A">Product A</option>
          <option value="Product B">Product B</option>
          <option value="Product C">Product C</option>
        </select>
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={productPrice}
          readOnly
        />
      </form>
    </div>
  );
};

export default Pricing;
