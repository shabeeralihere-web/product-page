import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";

function Navbar() {

  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  const { cartItems, setCartItems } = useContext(CartContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Calculate total quantity in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Open logout confirmation modal
  function handleLogoutClick() {
    setShowLogoutModal(true);
  }

  // Cancel logout
  function handleCancelLogout() {
    setShowLogoutModal(false);
  }

  // Confirm logout
  function handleConfirmLogout() {

    // Remove login and profile information
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");

    // Clear cart from React state
    setCartItems([]);

    // Go to login page
    window.location.href = "/login";
  }

  return (
    <>
      <nav className="navbar">

        <div className="logo">
          ProductHub
        </div>

        <div className="nav-links">

          {/* ================= HOME ================= */}

          <Link to="/">
            Home
          </Link>


          {/* ================= USER LINKS ================= */}

          {accessToken && role === "user" && (
            <>
              <Link to="/products">
                Products
              </Link>

              <Link to="/cart">
                Cart ({cartCount})
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          )}


          {/* ================= SELLER LINKS ================= */}

          {accessToken && role === "seller" && (
            <>
              <Link to="/products">
                All Products
              </Link>

              <Link to="/my-products">
                My Products
              </Link>

              <Link to="/cart">
                Cart ({cartCount})
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          )}


          {/* ================= ADMIN LINKS ================= */}

          {accessToken && role === "admin" && (
            <>
              <Link to="/products">
                Products
              </Link>

              <Link to="/add-product">
                Add Product
              </Link>

              <Link to="/admin-dashboard">
                Dashboard
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          )}


          {/* ================= LOGIN / SIGNUP ================= */}

          {!accessToken && (
            <>
              <Link to="/signup">
                Signup
              </Link>

              <Link to="/login">
                Login
              </Link>
            </>
          )}


          {/* ================= LOGOUT ================= */}

          {accessToken && (
            <button
              className="logout-button"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          )}

        </div>

      </nav>


      {/* ================= LOGOUT CONFIRMATION MODAL ================= */}

      {showLogoutModal && (
        <div className="modal">

          <div className="modal-content">

            <h2>Logout?</h2>

            <p>
              Are you sure you want to logout from your account?
            </p>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>

              <button
                className="confirm-logout-button"
                onClick={handleConfirmLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default Navbar;