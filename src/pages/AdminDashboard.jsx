import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaStore,
  FaUserShield,
  FaBoxOpen,
  FaShoppingBag,
} from "react-icons/fa";
import api from "../api";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  async function getDashboardData() {
    try {
      const token = localStorage.getItem("accessToken");

      const [usersResponse, productsResponse] =
        await Promise.all([
          api.get(
            "/auth/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          api.get(
            "/products/getProducts",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

      setUsers(usersResponse.data.data);
      setProducts(productsResponse.data.data);
    } catch (error) {
      console.log("ADMIN DASHBOARD ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const totalUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  const totalSellers = users.filter(
    (user) => user.role === "seller"
  ).length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const totalProducts = products.length;

  if (isLoading) {
    return (
      <div className="ph-admin-page">
        <div className="ph-admin-loading">
          <div className="ph-admin-spinner"></div>

          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ph-admin-page">
        <div className="ph-admin-error">
          <div className="ph-admin-error-icon">!</div>

          <h2>Unable to load dashboard</h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ph-admin-page">

      <div className="ph-admin-container">

        {/* HEADER */}

        <header className="ph-admin-header">

          <div className="ph-admin-header-content">

            <span className="ph-admin-eyebrow">
              ADMIN CENTER
            </span>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Monitor users, sellers and products
              from one centralized dashboard.
            </p>

          </div>

          <div className="ph-admin-header-icon">
            <FaUserShield />
          </div>

        </header>


        {/* STATS */}

        <section className="ph-admin-stats">

          <div className="ph-admin-stat-card">

            <div className="ph-admin-stat-icon">
              <FaUsers />
            </div>

            <div className="ph-admin-stat-content">

              <span>
                Total Users
              </span>

              <strong>
                {totalUsers}
              </strong>

            </div>

          </div>


          <div className="ph-admin-stat-card">

            <div className="ph-admin-stat-icon">
              <FaStore />
            </div>

            <div className="ph-admin-stat-content">

              <span>
                Total Sellers
              </span>

              <strong>
                {totalSellers}
              </strong>

            </div>

          </div>


          <div className="ph-admin-stat-card">

            <div className="ph-admin-stat-icon">
              <FaUserShield />
            </div>

            <div className="ph-admin-stat-content">

              <span>
                Total Admins
              </span>

              <strong>
                {totalAdmins}
              </strong>

            </div>

          </div>


          <div className="ph-admin-stat-card">

            <div className="ph-admin-stat-icon">
              <FaBoxOpen />
            </div>

            <div className="ph-admin-stat-content">

              <span>
                Total Products
              </span>

              <strong>
                {totalProducts}
              </strong>

            </div>

          </div>

        </section>


        {/* USERS AND SELLERS */}

        <section className="ph-admin-section">

          <div className="ph-admin-section-header">

            <div>
              <span className="ph-admin-section-label">
                ACCOUNT MANAGEMENT
              </span>

              <h2>
                Users & Sellers
              </h2>
            </div>

            <span className="ph-admin-count">
              {users.length} accounts
            </span>

          </div>


          <div className="ph-admin-table-container">

            <table className="ph-admin-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user._id}>

                    <td>

                      <div className="ph-admin-user">

                        <div className="ph-admin-avatar">
                          {user.firstName
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="ph-admin-user-info">

                          <strong>
                            {user.firstName}{" "}
                            {user.lastName}
                          </strong>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="ph-admin-email">
                        {user.email}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`ph-admin-role ph-admin-role--${user.role}`}
                      >
                        {user.role}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* PRODUCTS */}

        <section className="ph-admin-section">

          <div className="ph-admin-section-header">

            <div>
              <span className="ph-admin-section-label">
                PRODUCT MANAGEMENT
              </span>

              <h2>
                All Products
              </h2>
            </div>

            <span className="ph-admin-count">
              {products.length} products
            </span>

          </div>


          <div className="ph-admin-table-container">

            <table className="ph-admin-table">

              <thead>

                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr key={product._id}>

                    <td>

                      <div className="ph-admin-product">

                        <div className="ph-admin-product-image">

                          <img
                            src={`http://localhost:8000/${product.image}`}
                            alt={product.name}
                          />

                        </div>

                        <div className="ph-admin-product-info">

                          <strong>
                            {product.name}
                          </strong>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="ph-admin-category">
                        {product.category}
                      </span>

                    </td>


                    <td>

                      <strong className="ph-admin-price">
                        ₹{product.price}
                      </strong>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* BOTTOM OVERVIEW */}

        <section className="ph-admin-overview">

          <div className="ph-admin-overview-card">

            <div className="ph-admin-overview-icon">
              <FaUsers />
            </div>

            <div>

              <span>
                Registered Accounts
              </span>

              <strong>
                {users.length}
              </strong>

            </div>

          </div>


          <div className="ph-admin-overview-card">

            <div className="ph-admin-overview-icon">
              <FaShoppingBag />
            </div>

            <div>

              <span>
                Available Products
              </span>

              <strong>
                {products.length}
              </strong>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
};

export default AdminDashboard;