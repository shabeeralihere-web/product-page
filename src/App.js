import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SellerDashboard from "./pages/SellerDashboard";
import MyProducts from "./pages/MyProducts";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import { useAuth } from "./Context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { accessToken, role } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function App() {
  const [products, setProducts] = useState([]);

  function deleteProduct(name) {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.name !== name
      )
    );
  }

  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <main className="main-content">
          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                    "admin",
                  ]}
                >
                  <Products
                    products={products}
                    deleteProduct={deleteProduct}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                    "admin",
                  ]}
                >
                  <ProductDetails
                    products={products}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                    "admin",
                  ]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                  ]}
                >
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-product"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "seller",
                    "admin",
                  ]}
                >
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "seller",
                    "admin",
                  ]}
                >
                  <EditProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seller-dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["seller"]}
                >
                  <SellerDashboard />
                </ProtectedRoute>
              }
            >
              <Route
                path="my-products"
                element={<MyProducts />}
              />

              <Route
                path="add-product"
                element={<AddProduct />}
              />

              <Route
                path="profile"
                element={<Profile />}
              />
            </Route>

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

            <Route
              path="/checkout"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "seller",
                  ]}
                >
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />

            <Route
              path="*"
              element={<NotFound />}
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