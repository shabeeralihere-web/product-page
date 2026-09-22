import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCartPlus,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../api";
import CartContext from "../Context/CartContext";
import { toast } from "react-toastify";

import "../Styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);

        const response = await api.get(
          `http://localhost:8000/api/products/getProduct/${id}`
        );

        console.log(response.data);

        setProduct(response.data.data);
      } catch (error) {
        console.log(error);

        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.post(
        "http://localhost:8000/api/cart/add",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      getCart();

      if (response.data.message === "Product added to cart") {
        toast.success("Product added to cart");
      } else {
        toast.info("Product is already in your cart");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  }

  if (isLoading) {
    return (
      <main className="details-page">
        <div className="details-page__container">
          <div className="details-loading">
            <div className="details-loading__spinner" />
            <p>Loading product...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="details-page">
        <div className="details-page__container">
          <div className="details-not-found">
            <div className="details-not-found__icon">!</div>

            <span className="details-page__eyebrow">
              PRODUCTHUB
            </span>

            <h1>Product Not Found</h1>

            <p>
              The product you're looking for could not be found
              or may no longer be available.
            </p>

            <button
              type="button"
              className="details-button details-button--primary"
              onClick={() => navigate("/products")}
            >
              <FaArrowLeft />
              Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">
      <div className="details-page__container">
        <button
          type="button"
          className="details-back-link"
          onClick={() => navigate("/products")}
        >
          <FaArrowLeft />
          <span>Back to Products</span>
        </button>

        <section className="details-card">
          <div className="details-image-section">
            <div className="details-image-wrapper">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="details-image"
              />
            </div>

            <div className="details-image-note">
              <FaCheckCircle />
              <span>Product available</span>
            </div>
          </div>

          <div className="details-info">
            <span className="details-category">
              {product.category}
            </span>

            <h1 className="details-title">
              {product.name}
            </h1>

            <div className="details-price">
              ₹{product.price}
            </div>

            <div className="details-divider" />

            <div className="details-description">
              <span className="details-description__label">
                ABOUT THIS PRODUCT
              </span>

              <p>
                This product is available in our ProductHub
                collection. Add it to your cart and continue
                shopping through the ProductHub marketplace.
              </p>
            </div>

            <div className="details-actions">
              <button
                type="button"
                className="details-button details-button--secondary"
                onClick={() => navigate("/products")}
              >
                <FaArrowLeft />
                Continue Shopping
              </button>

              <button
                type="button"
                className="details-button details-button--primary"
                onClick={handleAddToCart}
              >
                <FaCartPlus />
                Add to Cart
              </button>
            </div>

            <div className="details-meta">
              <div className="details-meta__item">
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;