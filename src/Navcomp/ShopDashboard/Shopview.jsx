import React from "react";
import "./ShopView.css";

function ShopView() {

  const products = [
    {
      name: "Fresh Apples",
      price: "₹120/kg",
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
    },
    {
      name: "Organic Vegetables",
      price: "₹80/kg",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e"
    },
    {
      name: "Milk Pack",
      price: "₹45",
      img: "https://images.unsplash.com/photo-1580910051074-3eb694886505"
    },
    {
      name: "Biscuits",
      price: "₹30",
      img: "https://tse4.mm.bing.net/th/id/OIP.FJgv6L6avqN8JgC0ricSaAHaEc?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Rice Bag",
      price: "₹1200",
      img: "https://tse4.mm.bing.net/th/id/OIP.Y5jA-VE5iYOxT7JymhyJOwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Cooking Oil",
      price: "₹150",
      img: "https://tse2.mm.bing.net/th/id/OIP.kmHW8brSkwX9q2fpWiPnzAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  ];

  return (
    <div className="shop-view">

      <h1 className="shop-title">Shop Products</h1>

      <div className="product-grid">

        {products.map((p, index) => (
          <div className="product-card" key={index}>

            <img src={p.img} alt="product" />

            <div className="product-info">
              <h3>{p.name}</h3>
              <p>{p.price}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ShopView;