
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaCartPlus,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

import api from "../api";
import CartContext from "../Context/CartContext";
import "../Styles/Product.css";

function Product({
  id,
  name,
  price,
  category,
  image,
  onDelete,
  isMyProduct = false,
}) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const { getCart, setCartCount } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [cartModalMessage, setCartModalMessage] = useState({
    title: "",
    message: "",
  });

  function handleView() {
    if (role === "admin") {
      return;
    }

    if (role === "seller" && isMyProduct) {
      return;
    }

    navigate(`/product/${id}`);
  }

  function handleEdit() {
    navigate(`/edit-product/${id}`);
  }

  async function handleAddToCart() {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.post(
        "/cart/add",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pagination = await getCart(1);

      if (pagination) {
        setCartCount(pagination.totalItems);
      }

      if (response.data.message === "Product added to cart") {
        setCartModalMessage({
          title: "Added to Cart!",
          message: `${name} has been added to your cart.`,
        });
      } else {
        setCartModalMessage({
          title: "Already in Cart",
          message: `${name} is already in your cart.`,
        });
      }

      setShowCartModal(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }

  async function handleDelete() {
    try {
      const token = localStorage.getItem("accessToken");

      await api.delete(
        `/products/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onDelete) {
        onDelete(id);
      }

      setShowModal(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }

  const canManageProduct =
    role === "admin" || (role === "seller" && isMyProduct);

  const canAddToCart =
    role === "user" || (role === "seller" && !isMyProduct);

  const isCardClickable =
    role !== "admin" && !(role === "seller" && isMyProduct);

  return (
    <>
      <article
        className={`product-card ${
          isCardClickable ? "product-card--clickable" : ""
        }`}
        onClick={handleView}
        role={isCardClickable ? "button" : undefined}
        tabIndex={isCardClickable ? 0 : undefined}
        onKeyDown={(event) => {
          if (
            isCardClickable &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            handleView();
          }
        }}
      >
        <div className="product-card__image-wrapper">
         <img
  className="product-card__image"
  src={
    image?.startsWith("http")
      ? image
      : `${process.env.REACT_APP_BACKEND_URL}/${image}`
  }
  alt={name}
/>

          <span className="product-card__category">{category}</span>

          {role === "seller" && isMyProduct && (
            <span className="product-card__owner-badge">
              Your Product
            </span>
          )}

          {role === "admin" && (
            <span className="product-card__owner-badge">Admin</span>
          )}
        </div>

        <div className="product-card__body">
          <div className="product-card__main">
            <h2 className="product-card__name">{name}</h2>

            <p className="product-card__price">₹{price}</p>
          </div>

          {isCardClickable && (
            <div className="product-card__view">
              <span>View product</span>
              <FaArrowRight />
            </div>
          )}

          <div className="product-card__actions">
            {canManageProduct && (
              <button
                type="button"
                className="product-card__action product-card__action--edit"
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit();
                }}
              >
                <FaEdit />
                <span>Edit</span>
              </button>
            )}

            {canManageProduct && (
              <button
                type="button"
                className="product-card__action product-card__action--delete"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowModal(true);
                }}
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            )}

            {canAddToCart && (
              <button
                type="button"
                className="product-card__action product-card__action--cart"
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToCart();
                }}
              >
                <FaCartPlus />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </article>

      {showCartModal && (
        <div
          className="product-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-modal-title"
        >
          <div
            className="product-modal__backdrop"
            onClick={() => setShowCartModal(false)}
          />

          <div className="product-modal__content">
            <button
              type="button"
              className="product-modal__close"
              onClick={() => setShowCartModal(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="product-modal__icon product-modal__icon--cart">
              <FaCartPlus />
            </div>

            <h2 id="cart-modal-title">{cartModalMessage.title}</h2>

            <p>{cartModalMessage.message}</p>

            <div className="product-modal__actions">
              <button
                type="button"
                className="product-modal__button product-modal__button--secondary"
                onClick={() => setShowCartModal(false)}
              >
                Continue Shopping
              </button>

              <button
                type="button"
                className="product-modal__button product-modal__button--primary"
                onClick={() => {
                  setShowCartModal(false);
                  navigate("/cart");
                }}
              >
                Go to Cart
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="product-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div
            className="product-modal__backdrop"
            onClick={() => setShowModal(false)}
          />

          <div className="product-modal__content">
            <button
              type="button"
              className="product-modal__close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="product-modal__icon product-modal__icon--delete">
              <FaTrash />
            </div>

            <h2 id="delete-modal-title">Delete Product?</h2>

            <p>
              Are you sure you want to delete <strong>{name}</strong>?
            </p>

            <div className="product-modal__actions">
              <button
                type="button"
                className="product-modal__button product-modal__button--secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="product-modal__button product-modal__button--danger"
                onClick={handleDelete}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;



