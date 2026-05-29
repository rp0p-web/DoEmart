import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopLogin.css";

function ShopKeeperLogin() {

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const path = useNavigate();

  const [form, setForm] = useState({
    name: "",
    shopName: "",
    address: "",
    phone: "",
    userId: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/shop/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);
    console.log("REGISTER RESPONSE:", data);

    if (data.success) {

      alert("Shop Registered ✅");

      // ✅ STORE USER
      localStorage.setItem("shop", JSON.stringify(data.user));

      path("/shopdash");

    } else {
      alert("Registration failed ❌");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="shop-login-page">
      <div ref={sectionRef} className={`shop-login-container ${visible ? "show" : ""}`}>
        <h1>Register Your Shop</h1>

        <form onSubmit={handleRegister}>
          <input name="name" placeholder="Shopkeeper Name" onChange={handleChange} required />
          <input name="shopName" placeholder="Shop Name" onChange={handleChange} required />
          <input name="address" placeholder="Shop Address" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input name="userId" placeholder="User ID" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <button type="submit" className="login-btn">
            Create Your Shop →
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => path("/shoplogin")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ShopKeeperLogin;