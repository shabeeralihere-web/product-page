import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowRight,
  FaBoxOpen,
  FaChartLine,
  FaCheckCircle,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaStore,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import api from "../api";
import { useAuth } from "../Context/AuthContext";

import "../Styles/SellerDashboard.css";

function SellerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [productCount, setProductCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isDashboardHome =
    location.pathname === "/seller-dashboard";

  useEffect(() => {
    getProductCount();
  }, []);

  async function getProductCount() {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await api.get(
        "/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProductCount(
        response.data.pagination?.totalProducts || 0
      );
    } catch (error) {
      console.log(
        "GET SELLER PRODUCTS ERROR:",
        error
      );
    }
  }

  function handleLogoutClick() {
    setShowLogoutModal(true);
  }

  function handleCancelLogout() {
    setShowLogoutModal(false);
  }

  function handleConfirmLogout() {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  }

  const firstName =
    user?.firstName || "Seller";

  const lastName =
    user?.lastName || "";

  const email =
    user?.email || "No email available";

  const avatarLetter =
    firstName.charAt(0).toUpperCase();

  return (
    <>
      <section className="ph-seller-dashboard">

        {/* SIDEBAR */}

        <aside className="ph-seller-sidebar">

          <div className="ph-seller-sidebar-top">

            <div className="ph-seller-brand">
              <div className="ph-seller-brand-icon">
                <FaStore />
              </div>

              <div>
                <strong>ProductHub</strong>
                <span>Seller Center</span>
              </div>
            </div>

            <div className="ph-seller-divider" />

            <nav className="ph-seller-navigation">

              <NavLink
                to="/seller-dashboard"
                end
                className={({ isActive }) =>
                  `ph-seller-navigation-link ${
                    isActive
                      ? "ph-seller-navigation-link--active"
                      : ""
                  }`
                }
              >
                <span className="ph-seller-navigation-icon">
                  <FaHome />
                </span>

                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/seller-dashboard/my-products"
                className={({ isActive }) =>
                  `ph-seller-navigation-link ${
                    isActive
                      ? "ph-seller-navigation-link--active"
                      : ""
                  }`
                }
              >
                <span className="ph-seller-navigation-icon">
                  <FaBoxOpen />
                </span>

                <span>My Products</span>
              </NavLink>

              <NavLink
                to="/seller-dashboard/add-product"
                className={({ isActive }) =>
                  `ph-seller-navigation-link ${
                    isActive
                      ? "ph-seller-navigation-link--active"
                      : ""
                  }`
                }
              >
                <span className="ph-seller-navigation-icon">
                  <FaPlus />
                </span>

                <span>Add Product</span>
              </NavLink>

              <NavLink
                to="/seller-dashboard/profile"
                className={({ isActive }) =>
                  `ph-seller-navigation-link ${
                    isActive
                      ? "ph-seller-navigation-link--active"
                      : ""
                  }`
                }
              >
                <span className="ph-seller-navigation-icon">
                  <FaUser />
                </span>

                <span>Profile</span>
              </NavLink>

            </nav>
          </div>

          {/* SIDEBAR BOTTOM */}

          <div className="ph-seller-sidebar-bottom">

            <div className="ph-seller-user-card">

              <div className="ph-seller-user-avatar">
                {avatarLetter}
              </div>

              <div className="ph-seller-user-details">
                <strong>{firstName}</strong>
                <span>Seller Account</span>
              </div>

            </div>

            <button
              type="button"
              className="ph-seller-logout"
              onClick={handleLogoutClick}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

          </div>

        </aside>

        {/* MAIN DASHBOARD */}

        <div className="ph-seller-content">

          {isDashboardHome && (
            <div className="ph-seller-home">

              {/* HEADER */}

              <header className="ph-seller-header">

                <div>
                  <span className="ph-seller-eyebrow">
                    SELLER CENTER
                  </span>

                  <h1>
                    Welcome back, {firstName}
                  </h1>

                  <p>
                    Manage your products and seller
                    account from one place.
                  </p>
                </div>

                <button
                  type="button"
                  className="ph-seller-primary-button"
                  onClick={() =>
                    navigate(
                      "/seller-dashboard/add-product"
                    )
                  }
                >
                  <FaPlus />
                  <span>Add Product</span>
                </button>

              </header>

              {/* STATS */}

              <section className="ph-seller-stats">

                <article className="ph-seller-stat-card">

                  <div className="ph-seller-stat-icon">
                    <FaBoxOpen />
                  </div>

                  <div className="ph-seller-stat-content">

                    <span>
                      MY PRODUCTS
                    </span>

                    <strong>
                      {productCount}
                    </strong>

                    <p>
                      Products you have added
                    </p>

                  </div>

                </article>

                <article className="ph-seller-stat-card">

                  <div className="ph-seller-stat-icon">
                    <FaCheckCircle />
                  </div>

                  <div className="ph-seller-stat-content">

                    <span>
                      ACCOUNT STATUS
                    </span>

                    <strong>
                      Active
                    </strong>

                    <p>
                      Your seller account is active
                    </p>

                  </div>

                </article>

                <article className="ph-seller-stat-card">

                  <div className="ph-seller-stat-icon">
                    <FaChartLine />
                  </div>

                  <div className="ph-seller-stat-content">

                    <span>
                      SELLER ROLE
                    </span>

                    <strong>
                      Seller
                    </strong>

                    <p>
                      Product management access
                    </p>

                  </div>

                </article>

              </section>

              {/* QUICK ACTIONS */}

              <section className="ph-seller-section">

                <div className="ph-seller-section-heading">

                  <span className="ph-seller-eyebrow">
                    QUICK ACTIONS
                  </span>

                  <h2>
                    Manage your store
                  </h2>

                  <p>
                    Quickly access your most important
                    seller tools.
                  </p>

                </div>

                <div className="ph-seller-action-grid">

                  <button
                    type="button"
                    className="ph-seller-action-card"
                    onClick={() =>
                      navigate(
                        "/seller-dashboard/my-products"
                      )
                    }
                  >
                    <div className="ph-seller-action-icon">
                      <FaBoxOpen />
                    </div>

                    <div className="ph-seller-action-content">
                      <h3>
                        My Products
                      </h3>

                      <p>
                        View, edit and delete your
                        products.
                      </p>
                    </div>

                    <FaArrowRight className="ph-seller-action-arrow" />
                  </button>

                  <button
                    type="button"
                    className="ph-seller-action-card"
                    onClick={() =>
                      navigate(
                        "/seller-dashboard/add-product"
                      )
                    }
                  >
                    <div className="ph-seller-action-icon">
                      <FaPlus />
                    </div>

                    <div className="ph-seller-action-content">
                      <h3>
                        Add Product
                      </h3>

                      <p>
                        Add a new product to ProductHub.
                      </p>
                    </div>

                    <FaArrowRight className="ph-seller-action-arrow" />
                  </button>

                  <button
                    type="button"
                    className="ph-seller-action-card"
                    onClick={() =>
                      navigate(
                        "/seller-dashboard/profile"
                      )
                    }
                  >
                    <div className="ph-seller-action-icon">
                      <FaUser />
                    </div>

                    <div className="ph-seller-action-content">
                      <h3>
                        My Profile
                      </h3>

                      <p>
                        View your seller account
                        information.
                      </p>
                    </div>

                    <FaArrowRight className="ph-seller-action-arrow" />
                  </button>

                </div>

              </section>

              {/* SELLER ACCOUNT */}

              <section className="ph-seller-account-card">

                <div className="ph-seller-account-avatar">
                  {avatarLetter}
                </div>

                <div className="ph-seller-account-content">

                  <span className="ph-seller-eyebrow">
                    SELLER ACCOUNT
                  </span>

                  <h2>
                    {firstName} {lastName}
                  </h2>

                  <p>
                    {email}
                  </p>

                </div>

                <button
                  type="button"
                  className="ph-seller-secondary-button"
                  onClick={() =>
                    navigate(
                      "/seller-dashboard/profile"
                    )
                  }
                >
                  <span>View Profile</span>
                  <FaArrowRight />
                </button>

              </section>

            </div>
          )}

          {/* NESTED ROUTES */}

          <div className="ph-seller-nested">
            <Outlet />
          </div>

        </div>

      </section>

      {/* LOGOUT MODAL */}

      {showLogoutModal && (
        <div className="ph-seller-modal">

          <div
            className="ph-seller-modal-backdrop"
            onClick={handleCancelLogout}
          />

          <div
            className="ph-seller-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seller-logout-title"
          >

            <button
              type="button"
              className="ph-seller-modal-close"
              onClick={handleCancelLogout}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="ph-seller-modal-icon">
              <FaSignOutAlt />
            </div>

            <span className="ph-seller-modal-label">
              ACCOUNT
            </span>

            <h2 id="seller-logout-title">
              Logout?
            </h2>

            <p>
              Are you sure you want to logout
              from your seller account?
            </p>

            <div className="ph-seller-modal-actions">

              <button
                type="button"
                className="ph-seller-modal-cancel"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ph-seller-modal-confirm"
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

export default SellerDashboard;