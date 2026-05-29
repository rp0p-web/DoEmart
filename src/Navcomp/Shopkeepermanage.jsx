import React, { useState } from "react";
import "./Shopkeepermanage.css";

function Shopkeepermanage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [products, setProducts] = useState([]);

  const categories = [
    "Sofa",
    "Chair",
    "Table",
    "Bed",
    "Cupboard",
    "Others",
  ];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category) {
      alert("Please fill all required fields");
      return;
    }

    setProducts([...products, product]);

    setProduct({
      name: "",
      price: "",
      category: "",
      image: "",
    });
  };

  const deleteProduct = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  return (
    <div className="dashboard">
      <h1>Shopkeeper Dashboard</h1>

      {/* Add Product Form */}
      <form className="product-form" onSubmit={addProduct}>
        <h2>Add Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <div className="product-list">
        <h2>Your Products</h2>

        {products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          <div className="grid">
            {products.map((item, index) => (
              <div className="card" key={index}>
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <span>{item.category}</span>

                <button onClick={() => deleteProduct(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shopkeepermanage;