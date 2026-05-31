import React, { useState } from "react";
import "./CusmainLogin.css";
import { useNavigate } from "react-router-dom";

function UserLogin() {

  const path = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://doemart-backend.onrender.com/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ userId, password })
});

    const data = await response.json();

    if (data.success === true) {

      alert("Login successful ✅");

      // 🔥 STORE LOGIN SESSION
      localStorage.setItem("user", JSON.stringify(data.user));

      path("/category");

    } else {

      alert("Wrong User ID or Password ❌");

    }

  } catch (err) {
    console.log(err);
    alert("Server error ❌");
  }
};


  return (
    <div className="login-page">

      <div className="login-box">

        <h2>User Login</h2>

        {/* 🔥 IMPORTANT: form handles submit */}
        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 🔥 FIXED BUTTON */}
          <button type="submit">
            Login →
          </button>

        </form>

      </div>

    </div>
  );
}

export default UserLogin;