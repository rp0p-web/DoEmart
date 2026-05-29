import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CusmainLogin.css";

function ShopmainLogin() {

  const path = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:8080/api/shop/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, password })
      });

      const data = await res.json();

      if (data.success) {

        alert("Login success ✅");

        // 🔥 STORE SHOP DATA
        localStorage.setItem("shop", JSON.stringify(data.user));

        path("/shopdash");

      } else {
        alert("Invalid credentials ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h2>Shopkeeper Login</h2>

        <form onSubmit={handleLogin}>

          <input
            placeholder="User ID"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">Login →</button>

        </form>

      </div>
    </div>
  );
}

export default ShopmainLogin;