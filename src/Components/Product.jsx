import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartContext from "../Context/CartContext";

function Product({
  id,
  name,
  price,
  category,
  image,
  onDelete,
  isMyProduct = false
}) {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const { getCart } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);


  // ================= VIEW PRODUCT =================

  function handleView() {
    navigate(`/product/${id}`);
  }


  // ================= EDIT PRODUCT =================

  function handleEdit() {
    navigate(`/edit-product/${id}`);
  }


  // ================= ADD TO CART =================

  async function handleAddToCart() {

    try {

      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:8000/api/cart/add",
        {
          productId: id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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


  // ================= DELETE PRODUCT =================

  async function handleDelete() {

    try {

      const token = localStorage.getItem("accessToken");

      const response = await axios.delete(
        `http://localhost:8000/api/products/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      if (onDelete) {
        onDelete(id);
      }

      setShowModal(false);

      toast.success("Product deleted successfully");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  }


  // ================= ACTION CONDITIONS =================

  const canManageProduct =
    role === "admin" ||
    (role === "seller" && isMyProduct);

  const canAddToCart =
    role === "user" ||
    (role === "seller" && !isMyProduct);


  return (
    <>

      <div className="product-card">


        {/* ================= PRODUCT IMAGE ================= */}

        <img
          className="product-image"
          src={image}
          alt={name}
        />


        {/* ================= PRODUCT INFORMATION ================= */}

        <div className="product-info">

          <p className="product-category">
            {category}
          </p>

          <h2>
            {name}
          </h2>

          <p className="product-price">
            ₹{price}
          </p>

        </div>


        {/* ================= BUTTONS ================= */}

        <div className="product-actions">


          {/* VIEW */}

          <button
            className="view-button"
            onClick={handleView}
          >
            View
          </button>


          {/* EDIT */}

          {canManageProduct && (
            <button
              className="edit-button"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}


          {/* DELETE */}

          {canManageProduct && (
            <button
              className="delete-button"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          )}


          {/* ADD TO CART */}

          {canAddToCart && (
            <button
              className="cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}

        </div>

      </div>


      {/* ================= DELETE MODAL ================= */}

      {showModal && (

        <div className="modal">

          <div className="modal-content">

            <h2>
              Delete Product?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{name}</strong>?
            </p>


            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={handleDelete}
              >
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