import React, { useState, useEffect } from "react";
import "./Shop.css";
import { useNavigate } from "react-router-dom";
function ShopDashboard() {

  const [tab, setTab] = useState("home");
  const [showPopup, setShowPopup] = useState(false);
  const [shopName, setShopName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState(null);
  const path = useNavigate();

  useEffect(() => {

    const storedData = localStorage.getItem("shop");

    let stored = null;

    try {
      stored = storedData ? JSON.parse(storedData) : null;
    } catch {
      stored = null;
    }

    if (!stored) return;

    setShop(stored);
    setShopName(stored.shopName || "");
    setImage(stored.image || "");
    setCategory(stored.category || "");

  }, []);

  const handleSave = async () => {

    let currentShop = shop;

    if (!currentShop) {
      const stored = localStorage.getItem("shop");
      currentShop = stored ? JSON.parse(stored) : null;
    }

    if (!currentShop) {
      alert("Session expired, login again ❌");
      return;
    }

    try {

      const res = await fetch("http://localhost:8080/api/shop/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: currentShop.id,
          shopName,
          image,
          category
        })
      });

      const data = await res.json();

      if (data.success) {

        alert("Shop Updated ✅");

        const updated = { ...currentShop, shopName, image, category };

        localStorage.setItem("shop", JSON.stringify(updated));
        setShop(updated);

        setShowPopup(false);

      } else {
        alert("Update failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="dashboard">

      {/* 🔥 CAPSULE */}
      <div className="capsule">
        <button className={tab==="home"?"active":""} onClick={()=>setTab("home")}>Home</button>
        <button onClick={()=>path("/shopm")}>Add Product</button>
        <button className={tab==="manage"?"active":""} onClick={()=>setTab("manage")}>Manage</button>
        <button className={tab==="about"?"active":""} onClick={()=>setTab("about")}>About</button>
      </div>

      {/* 🔥 CONTENT */}
      <div className="content">

        {tab === "home" && (
          <>
            <h1 className="title">Your Shop</h1>

            <div className="shop-card" onClick={()=>setShowPopup(true)}>
              <img 
                src={
                  image ||
                  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                }
                alt="shop"
              />
              <div className="shop-overlay">
                <h2>{shopName || "Create Your Shop"}</h2>
                <p>{category || "Click to setup your shop"}</p>
              </div>
            </div>
          </>
        )}

        {tab === "add" && <h2>Add Product Section</h2>}
        {tab === "manage" && <h2>Manage Products</h2>}
        {tab === "about" && <h2>About Shop</h2>}

      </div>

      {/* 🔥 POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-box">

            <h2>Setup Shop</h2>

            <input
              placeholder="Shop Name"
              value={shopName}
              onChange={(e)=>setShopName(e.target.value)}
            />

            <input
              placeholder="Image URL"
              value={image}
              onChange={(e)=>setImage(e.target.value)}
            />

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Departmental">Departmental</option>
              <option value="Medical">Medical</option>
              <option value="Other">Other</option>
            </select>

            <div className="popup-btns">
              <button onClick={handleSave}>Save</button>
              <button onClick={()=>setShowPopup(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ShopDashboard;