import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUser,
  FaChartBar,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../Styles/Navbar.css";

function Navbar() {
  const { role, accessToken, logout } = useAuth();

  const {
    cartCount,
    setCartItems,
    setCartCount,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogoutClick() {
    setShowLogoutModal(true);
    setMenuOpen(false);
  }

  function handleCancelLogout() {
    setShowLogoutModal(false);
  }

  function handleConfirmLogout() {
    logout();
    setCartItems([]);
    setCartCount(0);
    setShowLogoutModal(false);

    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <Link
            to="/"
            className="navbar__brand"
            onClick={closeMenu}
          >
            <img
  src="/ProductHub.png"
  alt="ProductHub"
  className="navbar__brand-logo"
/>

            <span className="navbar__brand-name">
              Product<span>Hub</span>
            </span>
          </Link>

          <button
            type="button"
            className="navbar__menu-button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav
            className={`navbar__navigation ${
              menuOpen ? "navbar__navigation--open" : ""
            }`}
          >
            <div className="navbar__links">
              <Link
                to="/"
                className="navbar__link"
                onClick={closeMenu}
              >
                <FaHome />
                <span>Home</span>
              </Link>

              {accessToken && role === "user" && (
                <>
                  <Link
                    to="/products"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaBoxOpen />
                    <span>Products</span>
                  </Link>

                  <Link
                    to="/cart"
                    className="navbar__link navbar__link--cart"
                    onClick={closeMenu}
                  >
                    <FaShoppingCart />
                    <span>Cart</span>

                    {cartCount > 0 && (
                      <span className="navbar__cart-count">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                </>
              )}

              {accessToken && role === "seller" && (
                <>
                  <Link
                    to="/products"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaBoxOpen />
                    <span>All Products</span>
                  </Link>

                  <Link
                    to="/seller-dashboard"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaChartBar />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/cart"
                    className="navbar__link navbar__link--cart"
                    onClick={closeMenu}
                  >
                    <FaShoppingCart />
                    <span>Cart</span>

                    {cartCount > 0 && (
                      <span className="navbar__cart-count">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                </>
              )}

              {accessToken && role === "admin" && (
                <>
                  <Link
                    to="/products"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaBoxOpen />
                    <span>Products</span>
                  </Link>

                  <Link
                    to="/add-product"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaPlus />
                    <span>Add Product</span>
                  </Link>

                  <Link
                    to="/admin-dashboard"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaChartBar />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                </>
              )}

              {!accessToken && (
                <>
                  <Link
                    to="/signup"
                    className="navbar__link"
                    onClick={closeMenu}
                  >
                    <FaUser />
                    <span>Signup</span>
                  </Link>

                  <Link
                    to="/login"
                    className="navbar__login"
                    onClick={closeMenu}
                  >
                    <FaSignOutAlt />
                    <span>Login</span>
                  </Link>
                </>
              )}

              {accessToken && (
                <button
                  type="button"
                  className="navbar__logout"
                  onClick={handleLogoutClick}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {showLogoutModal && (
        <div
          className="logout-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div
            className="logout-modal__backdrop"
            onClick={handleCancelLogout}
          />

          <div className="logout-modal__content">
            <div className="logout-modal__icon">
              <FaSignOutAlt />
            </div>

            <h2 id="logout-title">Logout?</h2>

            <p>
              Are you sure you want to logout from your account?
            </p>

            <div className="logout-modal__actions">
              <button
                type="button"
                className="logout-modal__cancel"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-modal__confirm"
                onClick={handleConfirmLogout}
              >
                <FaSignOutAlt />
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