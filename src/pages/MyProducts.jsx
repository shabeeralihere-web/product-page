import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Product from "../Components/Product";

function MyProducts() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();


  // ================= GET MY PRODUCTS =================

  useEffect(() => {
    getMyProducts();
  }, []);


  async function getMyProducts() {

    try {

      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8000/api/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("MY PRODUCTS:", response.data);

      setProducts(response.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setIsLoading(false);

    }
  }


  // ================= DELETE PRODUCT =================

  function handleProductDeleted(id) {

    setProducts(
      products.filter((product) => product._id !== id)
    );

  }


  // ================= LOADING =================

  if (isLoading) {

    return (
      <div className="my-products-page">

        <div className="page-loading">

          <h2>Loading your products...</h2>

        </div>

      </div>
    );

  }


  return (
    <div className="my-products-page">


      {/* ================= HEADER ================= */}

      <div className="my-products-header">

        <div>

          <p className="page-label">
            SELLER CENTER
          </p>

          <h1>
            My Products
          </h1>

          <p>
            Manage the products you have added to ProductHub.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>

      </div>


      {/* ================= EMPTY STATE ================= */}

      {products.length === 0 ? (

        <div className="empty-products">

          <h2>
            No Products Yet
          </h2>

          <p>
            You haven't added any products yet.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/add-product")}
          >
            Add Your First Product
          </button>

        </div>

      ) : (

        <>

          {/* ================= PRODUCT COUNT ================= */}

          <div className="products-count">

            <p>
              {products.length}{" "}
              {products.length === 1
                ? "product"
                : "products"}
            </p>

          </div>


          {/* ================= PRODUCT LIST ================= */}

          <div className="products-list">

            {products.map((product) => (
<Product
  key={product._id}
  id={product._id}
  name={product.name}
  price={product.price}
  category={product.category}
  image={product.image}
  onDelete={handleProductDeleted}
  isMyProduct={true}
/>

            ))}

          </div>

        </>

      )}

    </div>
  );
}

export default MyProducts;