import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  // ================= GET DASHBOARD DATA =================

  useEffect(() => {
    getDashboardData();
  }, []);


  async function getDashboardData() {

    try {

      const token = localStorage.getItem("accessToken");

      const [usersResponse, productsResponse] =
        await Promise.all([

          axios.get(
            "http://localhost:8000/api/auth/users",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),

          axios.get(
            "http://localhost:8000/api/products/getProducts"
          )

        ]);


      setUsers(usersResponse.data.data);
      setProducts(productsResponse.data.data);

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to load dashboard data"
      );

    } finally {

      setIsLoading(false);

    }
  }


  // ================= COUNTS =================

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


  // ================= LOADING =================

  if (isLoading) {

    return (
      <div className="admin-dashboard-page">

        <div className="admin-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading admin dashboard...
          </p>

        </div>

      </div>
    );
  }


  // ================= ERROR =================

  if (error) {

    return (
      <div className="admin-dashboard-page">

        <div className="admin-error">

          <h2>
            Unable to load dashboard
          </h2>

          <p>
            {error}
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="admin-dashboard-page">


      {/* ================= HEADER ================= */}

      <div className="admin-dashboard-header">

        <div>

          <p className="page-label">
            ADMIN CENTER
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage users, sellers and products from one place.
          </p>

        </div>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="admin-stats-grid">


        {/* USERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            U
          </div>

          <div>

            <p>
              Total Users
            </p>

            <h2>
              {totalUsers}
            </h2>

          </div>

        </div>


        {/* SELLERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            S
          </div>

          <div>

            <p>
              Total Sellers
            </p>

            <h2>
              {totalSellers}
            </h2>

          </div>

        </div>


        {/* ADMINS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            A
          </div>

          <div>

            <p>
              Total Admins
            </p>

            <h2>
              {totalAdmins}
            </h2>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            P
          </div>

          <div>

            <p>
              Total Products
            </p>

            <h2>
              {totalProducts}
            </h2>

          </div>

        </div>

      </div>


      {/* ================= USER MANAGEMENT ================= */}

      <div className="admin-section">

        <div className="admin-section-header">

          <div>

            <p className="section-label">
              ACCOUNT MANAGEMENT
            </p>

            <h2>
              Users & Sellers
            </h2>

          </div>

          <span className="admin-section-count">
            {users.length} accounts
          </span>

        </div>


        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>

              <tr>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

              </tr>

            </thead>


            <tbody>

              {users.map((user) => (

                <tr key={user._id}>

                  <td>

                    <div className="admin-user-name">

                      <div className="admin-user-avatar">

                        {user.firstName
                          ?.charAt(0)
                          .toUpperCase()}

                      </div>

                      <span>
                        {user.firstName} {user.lastName}
                      </span>

                    </div>

                  </td>


                  <td>
                    {user.email}
                  </td>


                  <td>

                    <span
                      className={`admin-role-badge ${user.role}`}
                    >
                      {user.role}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= PRODUCT MANAGEMENT ================= */}

      <div className="admin-section">

        <div className="admin-section-header">

          <div>

            <p className="section-label">
              PRODUCT MANAGEMENT
            </p>

            <h2>
              All Products
            </h2>

          </div>

          <span className="admin-section-count">
            {products.length} products
          </span>

        </div>


        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>

              <tr>

                <th>
                  Product
                </th>

                <th>
                  Category
                </th>

                <th>
                  Price
                </th>

              </tr>

            </thead>


            <tbody>

              {products.map((product) => (

                <tr key={product._id}>

                  <td>

                    <div className="admin-product-name">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <span>
                        {product.name}
                      </span>

                    </div>

                  </td>


                  <td>
                    {product.category}
                  </td>


                  <td>
                    ₹{product.price}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;