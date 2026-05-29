import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className="landing">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          eMart
        </div>

        {/* Rounded Menu */}
        <div className="nav-menu">
          <Link to="/customer">Customer</Link>
           <Link to="/shop">Shopkeeper</Link>
          <a href="#">Admin</a>
          <a href="#">About</a>
        </div>

        {/* Partner Button */}
        <button className="partner-btn">
          Become Partner
        </button>

      </nav>

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-overlay">

          <h1>
            Welcome,<br/>
            <span>Empowering Local Shops</span>
          </h1>

          <p>
            Discover trusted local businesses across Tamil Nadu and
            support your neighborhood economy.
          </p>

          <button className="hero-btn">
            Explore Shops
          </button>

        </div>

      </section>

    </div>
  )
}

export default Navbar