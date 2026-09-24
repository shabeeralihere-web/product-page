import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBoxOpen,
  FaPlus,
} from "react-icons/fa";

import api from "../api";
import Product from "../Components/Product";

import "../Styles/MyProducts.css";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getMyProducts = async () => {
      try {
        setIsLoading(true);

        const token =
          localStorage.getItem("accessToken");

        const response = await api.get(
          `/products/my-products?page=${currentPage}&limit=6`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "MY PRODUCTS:",
          response.data
        );

        setProducts(response.data.data);

        setTotalPages(
          response.data.pagination.totalPages
        );

        setTotalProducts(
          response.data.pagination.totalProducts
        );
      } catch (error) {
        console.log(
          "GET MY PRODUCTS ERROR:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    getMyProducts();
  }, [currentPage]);

  function handleProductDeleted(id) {
    setProducts((previousProducts) =>
      previousProducts.filter(
        (product) => product._id !== id
      )
    );

    setTotalProducts((previousTotal) =>
      Math.max(previousTotal - 1, 0)
    );
  }

  function handlePageChange(page) {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage((previousPage) =>
        previousPage - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((previousPage) =>
        previousPage + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  if (isLoading) {
    return (
      <main className="ph-my-products-page">
        <div className="ph-my-products-loading">

          <div className="ph-my-products-loader">
            <div />
          </div>

          <span className="ph-my-products-eyebrow">
            SELLER CENTER
          </span>

          <h2>
            Loading your products...
          </h2>

          <p>
            Please wait while we load your
            product collection.
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="ph-my-products-page">

      <div className="ph-my-products-container">

        {/* HEADER */}

        <header className="ph-my-products-header">

          <div className="ph-my-products-heading">

            <button
              type="button"
              className="ph-my-products-back"
              onClick={() =>
                navigate("/seller-dashboard")
              }
            >
              <FaArrowLeft />
              <span>Dashboard</span>
            </button>

            <div className="ph-my-products-title-row">

              <div className="ph-my-products-title-icon">
                <FaBoxOpen />
              </div>

              <div>

                <span className="ph-my-products-eyebrow">
                  SELLER CENTER
                </span>

                <h1>
                  My Products
                </h1>

                <p>
                  Manage the products you have
                  added to ProductHub.
                </p>

              </div>

            </div>

          </div>

          <button
            type="button"
            className="ph-my-products-add-button"
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


        {/* EMPTY STATE */}

        {products.length === 0 ? (

          <section className="ph-my-products-empty">

            <div className="ph-my-products-empty-icon">
              <FaBoxOpen />
            </div>

            <span className="ph-my-products-eyebrow">
              YOUR COLLECTION
            </span>

            <h2>
              No Products Yet
            </h2>

            <p>
              You haven't added any products
              to your seller account yet.
            </p>

            <button
              type="button"
              className="ph-my-products-empty-button"
              onClick={() =>
                navigate(
                  "/seller-dashboard/add-product"
                )
              }
            >
              <FaPlus />
              <span>
                Add Your First Product
              </span>
            </button>

          </section>

        ) : (

          <>

            {/* PRODUCT SUMMARY */}

            <section className="ph-my-products-summary">

              <div className="ph-my-products-summary-left">

                <span className="ph-my-products-summary-icon">
                  <FaBoxOpen />
                </span>

                <div>

                  <span>
                    YOUR PRODUCTS
                  </span>

                  <strong>
                    {totalProducts}
                  </strong>

                </div>

              </div>

              <p>
                {totalProducts === 1
                  ? "1 product in your collection"
                  : `${totalProducts} products in your collection`}
              </p>

              {totalPages > 1 && (
                <span className="ph-my-products-page-status">
                  Page {currentPage} of {totalPages}
                </span>
              )}

            </section>


            {/* PRODUCTS */}

            <section className="ph-my-products-list">

              {products.map((product) => (
                <div
                  className="ph-my-products-item"
                  key={product._id}
                >
                  <Product
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                    onDelete={
                      handleProductDeleted
                    }
                    isMyProduct={true}
                  />
                </div>
              ))}

            </section>


            {/* PAGINATION */}

            {totalPages > 1 && (

              <nav
                className="ph-my-products-pagination"
                aria-label="My products pagination"
              >

                <button
                  type="button"
                  className="ph-my-products-pagination-button ph-my-products-pagination-arrow"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft />
                  <span>Previous</span>
                </button>


                <div className="ph-my-products-page-numbers">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (

                    <button
                      type="button"
                      key={page}
                      className={`ph-my-products-page-number ${
                        currentPage === page
                          ? "ph-my-products-page-number--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePageChange(page)
                      }
                      aria-current={
                        currentPage === page
                          ? "page"
                          : undefined
                      }
                    >
                      {page}
                    </button>

                  ))}

                </div>


                <button
                  type="button"
                  className="ph-my-products-pagination-button ph-my-products-pagination-arrow"
                  onClick={handleNext}
                  disabled={
                    currentPage === totalPages
                  }
                >
                  <span>Next</span>
                  <FaArrowRight />
                </button>

              </nav>

            )}

          </>

        )}

      </div>

    </main>
  );
}

export default MyProducts;