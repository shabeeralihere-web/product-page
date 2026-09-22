import React, { useEffect, useState } from "react";
import api from "../api";
import Product from "../Components/Product";
import "../Styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");

        const response = await api.get(
          `http://localhost:8000/api/products/getProducts?page=${currentPage}&limit=6`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        setProducts(response.data.data);

        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage]);

  function handleProductDeleted(id) {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product._id !== id)
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
      setCurrentPage(currentPage - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <main className="products-page">
      <div className="products-page__container">

        <section className="products-page__header">
          <div className="products-page__heading">
            <span className="products-page__eyebrow">
              PRODUCTHUB MARKETPLACE
            </span>

            <h1 className="products-page__title">
              Explore Products
            </h1>

            <p className="products-page__description">
              Discover products available on ProductHub and find something
              that fits what you are looking for.
            </p>
          </div>

          <div className="products-page__header-info">
            <span className="products-page__status-dot" />
            <span>Marketplace</span>
          </div>
        </section>

        <section className="products-page__content">
          {loading ? (
            <div className="products-page__loading">
              <div className="products-page__loader" />

              <h2>Loading products...</h2>

              <p>
                Please wait while we get the latest products.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="products-page__empty">
              <div className="products-page__empty-icon">
                <span>+</span>
              </div>

              <span className="products-page__eyebrow">
                MARKETPLACE
              </span>

              <h2>No Products Yet</h2>

              <p>
                There are currently no products available on ProductHub.
              </p>
            </div>
          ) : (
            <>
              <div className="products-page__topbar">
                <div>
                  <span className="products-page__topbar-label">
                    AVAILABLE PRODUCTS
                  </span>

                  <p>
                    Showing products from the marketplace
                  </p>
                </div>

                {totalPages > 1 && (
                  <span className="products-page__page-indicator">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>

              <div className="products-page__grid">
                {products.map((product) => (
                  <div
                    className="products-page__product"
                    key={product._id}
                  >
                    <Product
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      category={product.category}
                      image={product.image}
                      onDelete={handleProductDeleted}
                      isMyProduct={false}
                    />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="products-page__pagination"
                  aria-label="Product pagination"
                >
                  <button
                    type="button"
                    className="products-page__pagination-button products-page__pagination-button--arrow"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>

                  <div className="products-page__page-numbers">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        type="button"
                        key={page}
                        className={`products-page__page-number ${
                          currentPage === page
                            ? "products-page__page-number--active"
                            : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="products-page__pagination-button products-page__pagination-button--arrow"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default Products;