import React, { useRef, useEffect, useState } from "react";
import "./CustomerLogin.css";
import { useNavigate } from "react-router-dom";

function CustomerLogin() {

  const path = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    district: "",
    city: "",
    pincode: "",
    email: "",
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

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        alert("Registered successfully ✅");
        path("/category");
      } else {
        alert("Registration failed ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  };

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (

    <div className="login-page">

      <div
        ref={sectionRef}
        className={`login-container reveal ${visible ? "show" : ""}`}
      >

        <div className="login-left">
          <h1>Welcome to <span>TN eMart</span></h1>
          <p>Find nearby shops and explore easily.</p>
        </div>

        <div className="login-form-box">

          <h2>Customer Registration</h2>

          <form className="form-grid" onSubmit={handleRegister}>

            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input name="district" placeholder="District" onChange={handleChange} required />
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} />

            {/* 🔥 LOGIN DETAILS */}
            <input name="userId" placeholder="User ID" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

            <button type="submit" className="login-btn">
              Register →
            </button>

            <p className="login-link">
              Already have an account?{" "}
              <span onClick={() => path("/CusmainLogin")}>Login</span>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CustomerLogin;