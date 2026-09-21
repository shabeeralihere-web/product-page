import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  // Modal states
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  // Store the cart item selected for removal
  const [selectedCartId, setSelectedCartId] = useState(null);


  // Get cart when page loads
  useEffect(() => {
    getCart();
  }, []);


  // Get cart items
  const getCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8000/api/cart/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      setCartItems(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };


  // Update quantity
  const updateQuantity = async (cartId, newQuantity) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.put(
        "http://localhost:8000/api/cart/update",
        {
          cartId: cartId,
          quantity: newQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      getCart();

    } catch (error) {
      console.log(error);
    }
  };


  // Open remove confirmation modal
  const openRemoveModal = (cartId) => {
    setSelectedCartId(cartId);
    setShowRemoveModal(true);
  };


  // Remove product from cart
  const removeFromCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.delete(
        "http://localhost:8000/api/cart/remove",
        {
          data: {
            cartId: selectedCartId
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      setShowRemoveModal(false);
      setSelectedCartId(null);

      getCart();

    } catch (error) {
      console.log(error);
    }
  };


  // Open clear cart confirmation modal
  const openClearModal = () => {
    setShowClearModal(true);
  };


  // Clear entire cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.delete(
        "http://localhost:8000/api/cart/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      setShowClearModal(false);

      getCart();

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="products-page">

      {/* Cart Header */}

      <div className="products-header">

        <p className="page-label">
          SHOPPING CART
        </p>

        <h1>My Cart</h1>

        <p>
          Review the products you've added to your cart.
        </p>

      </div>


      {/* Clear Cart Button */}

      {cartItems.length > 0 && (
        <div className="cart-header-actions">

          <button
            className="delete-button"
            onClick={openClearModal}
          >
            Clear Cart
          </button>

        </div>
      )}


      {/* Empty Cart */}

      {cartItems.length === 0 ? (

        <div className="empty-products">

          <h2>Your Cart is Empty</h2>

          <p>
            You haven't added any products to your cart yet.
          </p>

        </div>

      ) : (

        /* Cart Items */

        <div className="cart-list">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item._id}
            >

              {/* Product Image */}

              <div className="cart-image-container">

                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="cart-image"
                />

              </div>


              {/* Product Information */}

              <div className="cart-info">

                <p className="product-category">
                  {item.productId.category}
                </p>

                <h2>
                  {item.productId.name}
                </h2>

                <p className="product-price">
                  ₹{item.productId.price}
                </p>


                {/* Quantity */}

                <div className="cart-quantity">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* Remove */}

                <button
                  className="cart-remove-button"
                  onClick={() =>
                    openRemoveModal(item._id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =========================
          REMOVE MODAL
      ========================= */}

      {showRemoveModal && (

        <div className="modal">

          <div className="modal-content">

            <h2>Remove Item?</h2>

            <p>
              Are you sure you want to remove this item
              from your cart?
            </p>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => {
                  setShowRemoveModal(false);
                  setSelectedCartId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={removeFromCart}
              >
                Remove
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =========================
          CLEAR CART MODAL
      ========================= */}

      {showClearModal && (

        <div className="modal">

          <div className="modal-content">

            <h2>Clear Your Cart?</h2>

            <p>
              Are you sure you want to remove all items
              from your cart? This action cannot be undone.
            </p>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;