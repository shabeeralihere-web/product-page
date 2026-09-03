import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';

import EditProduct from './pages/EditProduct';
import ProductDetails from "./pages/ProductDetails";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  // Add Product
  function addProduct(newProduct) {
    setProducts([...products, newProduct]);
  }


  // Delete Product
  function deleteProduct(name) {
    setProducts(
      products.filter((product) => product.name !== name)
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

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />


            {/* Add Product */}
            <Route
              path="/add-product"
              element={
                <AddProduct
                  addProduct={addProduct}
                />
              }
            />


            {/* Products */}
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  deleteProduct={deleteProduct}
                />
              }
            />


            {/* Product Details / View */}
            <Route
              path="/product/:name"
              element={
                <ProductDetails
                  products={products}
                />
              }
            />


            {/* Edit Product */}
            <Route
              path="/edit-product/:name"
              element={
                <EditProduct
                  products={products}
                  setProducts={setProducts}
                />
              }
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;