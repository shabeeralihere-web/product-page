import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';

import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import ProductDetails from "./pages/ProductDetails";

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

import UserDashboard from "./pages/UserDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from './pages/AdminDashboard';
import Cart from "./pages/Cart";

import MyProducts from "./pages/MyProducts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// =========================================================
// PROTECTED ROUTE
// =========================================================

function ProtectedRoute({ children, allowedRoles }) {

  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");


  // User is not logged in
  if (!accessToken) {

    return <Navigate to="/login" replace />;

  }


  // Role is not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {

    return <Navigate to="/" replace />;

  }


  // Everything is okay
  return children;
}


function App() {

  // Add Product
 

  // Delete Product
  function deleteProduct(name) {

    setProducts(
      products.filter(
        (product) => product.name !== name
      )
    );

  }


  // Products State
  const [products, setProducts] = useState([]);


  return (

    <BrowserRouter>

      <div className="app">

        <Navbar />

        <main className="main-content">

          <Routes>

            {/* =================================================
                PUBLIC ROUTES
            ================================================= */}

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* Signup */}

            <Route
              path="/signup"
              element={<Signup />}
            />


            {/* Login */}

            <Route
              path="/login"
              element={<Login />}
            />


            {/* =================================================
                AUTHENTICATED USER / SELLER / ADMIN
            ================================================= */}

            {/* Products */}

            <Route
              path="/products"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                    "admin"
                  ]}
                >
                  <Products
                    products={products}
                    deleteProduct={deleteProduct}
                  />
                </ProtectedRoute>
              }
            />


            {/* Product Details */}

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                    "admin"
                  ]}
                >
                  <ProductDetails
                    products={products}
                  />
                </ProtectedRoute>
              }
            />


            {/* Profile */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                    "admin"
                  ]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />


            {/* =================================================
                USER + SELLER
            ================================================= */}

            {/* Cart */}

            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller"
                  ]}
                >
                  <Cart />
                </ProtectedRoute>
              }
            />


            {/* =================================================
                SELLER + ADMIN
            ================================================= */}

            {/* Add Product */}

            <Route
              path="/add-product"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "seller",
                    "admin"
                  ]}
                >
                  <AddProduct />
                </ProtectedRoute>
              }
            />


            {/* Edit Product */}

            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "seller",
                    "admin"
                  ]}
                >
                  <EditProduct />
                </ProtectedRoute>
              }
            />


            {/* =================================================
                USER DASHBOARD
            ================================================= */}

            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["user"]}
                >
                  <UserDashboard />
                </ProtectedRoute>
              }
            />


            {/* =================================================
                SELLER
            ================================================= */}

            {/* Seller Dashboard */}

            <Route
              path="/seller-dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["seller"]}
                >
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />


            {/* My Products */}

            <Route
              path="/my-products"
              element={
                <ProtectedRoute
                  allowedRoles={["seller"]}
                >
                  <MyProducts />
                </ProtectedRoute>
              }
            />


            {/* =================================================
                ADMIN
            ================================================= */}

            {/* Admin Dashboard */}

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["admin"]}
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>

        </main>

        <Footer />

      </div>

      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;