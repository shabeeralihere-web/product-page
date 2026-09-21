import React from "react";
import { Link } from "react-router-dom";

function Footer() {

  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h3>ProductHub</h3>

          <p>
            A simple platform to discover products,
            manage your store and shop with ease.
          </p>

        </div>


        {/* Platform */}

        <div className="footer-column">

          <h4>Platform</h4>

          <Link to="/">
            Home
          </Link>

          {accessToken && (
            <Link to="/products">
              Products
            </Link>
          )}

          {!accessToken && (
            <Link to="/signup">
              Create Account
            </Link>
          )}

        </div>


        {/* Role Based Links */}

        <div className="footer-column">

          <h4>
            {role === "seller"
              ? "Store"
              : role === "admin"
              ? "Management"
              : "For Users"}
          </h4>


          {/* USER */}

          {accessToken && role === "user" && (
            <>
              <Link to="/products">
                Explore Products
              </Link>

              <Link to="/cart">
                Shopping Cart
              </Link>

              <Link to="/profile">
                My Profile
              </Link>
            </>
          )}


          {/* SELLER */}

          {accessToken && role === "seller" && (
            <>
              <Link to="/products">
                All Products
              </Link>

              <Link to="/my-products">
                My Products
              </Link>

              <Link to="/add-product">
                Add Product
              </Link>
            </>
          )}


          {/* ADMIN */}

          {accessToken && role === "admin" && (
            <>
              <Link to="/products">
                Products
              </Link>

              <Link to="/add-product">
                Add Product
              </Link>

              <Link to="/admin-dashboard">
                Admin Dashboard
              </Link>
            </>
          )}


          {/* LOGGED OUT */}

          {!accessToken && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Create Account
              </Link>
            </>
          )}

        </div>


        {/* Account / Seller */}

        <div className="footer-column">

          <h4>
            {accessToken
              ? "Account"
              : "For Sellers"}
          </h4>


          {/* LOGGED OUT */}

          {!accessToken && (
            <>
              <Link to="/signup">
                Become a Seller
              </Link>

              <Link to="/login">
                Seller Login
              </Link>
            </>
          )}


          {/* LOGGED IN */}

          {accessToken && (
            <>
              <Link to="/">
                My Home
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          )}

        </div>

      </div>


      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 ProductHub. All rights reserved.
        </p>

        <p>
          Built with MERN Stack
        </p>

      </div>

    </footer>
  );
}

export default Footer;