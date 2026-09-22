import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CartContext from "../Context/CartContext";

import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaCreditCard,
  FaExclamationTriangle,
  FaArrowLeft,
  FaArrowRight,
  FaBoxOpen,
} from "react-icons/fa";

import "../Styles/Cart.css";

function Cart() {
  const {
    cartItems,
    getCart,
    updateCartQuantity,
    removeCartItem,
    clearCart,
  } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [showRemoveModal, setShowRemoveModal] =
    useState(false);

  const [showClearModal, setShowClearModal] =
    useState(false);

  const [showCheckoutModal, setShowCheckoutModal] =
    useState(false);

  const [selectedCheckoutItem, setSelectedCheckoutItem] =
    useState(null);

  const [selectedCartId, setSelectedCartId] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);

        const pagination = await getCart(currentPage);

        if (pagination) {
          setTotalPages(
            pagination.totalPages
          );

          setTotalItems(
            pagination.totalItems
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();

    // getCart is recreated by CartContext.
    // Current behavior is intentionally preserved.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const updateQuantity = async (
    cartId,
    newQuantity,
    productName
  ) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      await updateCartQuantity(
        cartId,
        newQuantity
      );

      toast.success(
        `${productName} quantity updated to ${newQuantity}`,
        {
          autoClose: 1200,
        }
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to update quantity"
      );
    }
  };

  const openRemoveModal = (cartId) => {
    setSelectedCartId(cartId);
    setShowRemoveModal(true);
  };

  const removeFromCart = async () => {
    try {
      await removeCartItem(
        selectedCartId
      );

      setShowRemoveModal(false);
      setSelectedCartId(null);

      toast.success(
        "Product removed from cart"
      );

      const pagination =
        await getCart(currentPage);

      if (pagination) {
        setTotalPages(
          pagination.totalPages
        );

        setTotalItems(
          pagination.totalItems
        );

        if (
          currentPage > pagination.totalPages &&
          pagination.totalPages > 0
        ) {
          setCurrentPage(
            pagination.totalPages
          );
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to remove product"
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();

      setShowClearModal(false);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalItems(0);

      toast.success(
        "Cart cleared successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to clear cart"
      );
    }
  };

  const handleCheckout = (cartItem) => {
    setSelectedCheckoutItem(cartItem);
    setShowCheckoutModal(true);
  };

  const continueToCheckout = () => {
    if (!selectedCheckoutItem) {
      return;
    }

    setShowCheckoutModal(false);

    navigate("/checkout", {
      state: {
        cartId:
          selectedCheckoutItem._id,

        product:
          selectedCheckoutItem.productId,

        quantity:
          selectedCheckoutItem.quantity,
      },
    });

    setSelectedCheckoutItem(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(
        currentPage - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        currentPage + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="ph-cart-page">
        <div className="ph-cart-loading">

          <div className="ph-cart-loading-spinner">
            <div />
          </div>

          <span>
            SHOPPING CART
          </span>

          <h2>
            Loading your cart...
          </h2>

          <p>
            Please wait while we load your
            shopping cart.
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="ph-cart-page">

      <div className="ph-cart-container">

        {/* HEADER */}

        <header className="ph-cart-header">

          <div className="ph-cart-heading">

            <button
              type="button"
              className="ph-cart-back-button"
              onClick={() =>
                navigate("/products")
              }
            >
              <FaArrowLeft />

              <span>
                Continue Shopping
              </span>
            </button>

            <div className="ph-cart-title-row">

              <div className="ph-cart-title-icon">
                <FaShoppingCart />
              </div>

              <div>

                <span className="ph-cart-eyebrow">
                  SHOPPING CART
                </span>

                <h1>
                  My Cart
                </h1>

                <p>
                  Review and manage the products
                  you've added to your cart.
                </p>

              </div>

            </div>

          </div>

          {totalItems > 0 && (
            <div className="ph-cart-header-actions">

              <span className="ph-cart-item-count">
                {totalItems}{" "}
                {totalItems === 1
                  ? "product"
                  : "products"}
              </span>

              <button
                type="button"
                className="ph-cart-clear-button"
                onClick={() =>
                  setShowClearModal(true)
                }
              >
                <FaTrash />

                <span>
                  Clear Cart
                </span>
              </button>

            </div>
          )}

        </header>


        {/* EMPTY CART */}

        {totalItems === 0 ? (

          <section className="ph-cart-empty">

            <div className="ph-cart-empty-icon">
              <FaShoppingCart />
            </div>

            <span className="ph-cart-eyebrow">
              YOUR CART
            </span>

            <h2>
              Your Cart is Empty
            </h2>

            <p>
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <button
              type="button"
              className="ph-cart-empty-button"
              onClick={() =>
                navigate("/products")
              }
            >
              <FaShoppingCart />

              Continue Shopping
            </button>

          </section>

        ) : (

          <>

            {/* CART SUMMARY */}

            <section className="ph-cart-summary">

              <div className="ph-cart-summary-item">

                <div className="ph-cart-summary-icon">
                  <FaBoxOpen />
                </div>

                <div>

                  <span>
                    CART ITEMS
                  </span>

                  <strong>
                    {totalItems}
                  </strong>

                </div>

              </div>

              {totalPages > 1 && (
                <span className="ph-cart-page-status">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>
              )}

            </section>


            {/* CART PRODUCTS */}

            <section className="ph-cart-grid">

              {cartItems.map((item) => {

                if (!item.productId) {
                  return null;
                }

                const product =
                  item.productId;

                const itemTotal =
                  Number(product.price) *
                  Number(item.quantity);

                return (
                  <article
                    className="ph-cart-card"
                    key={item._id}
                  >

                    {/* IMAGE */}

                    <div className="ph-cart-image-wrapper">

                      <img
                        src={`http://localhost:8000/${product.image}`}
                        alt={product.name}
                        className="ph-cart-image"
                      />

                    </div>


                    {/* CONTENT */}

                    <div className="ph-cart-card-content">

                      <span className="ph-cart-category">
                        {product.category}
                      </span>

                      <h2 className="ph-cart-product-name">
                        {product.name}
                      </h2>

                      <p className="ph-cart-product-price">
                        ₹{product.price}
                      </p>


                      {/* QUANTITY */}

                      <div className="ph-cart-quantity-row">

                        <span>
                          Quantity
                        </span>

                        <div className="ph-cart-quantity-control">

                          <button
                            type="button"
                            className="ph-cart-quantity-button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1,
                                product.name
                              )
                            }
                            disabled={
                              item.quantity === 1
                            }
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>

                          <span className="ph-cart-quantity-value">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            className="ph-cart-quantity-button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1,
                                product.name
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>

                        </div>

                      </div>


                      {/* TOTAL */}

                      <div className="ph-cart-total-row">

                        <span>
                          Item Total
                        </span>

                        <strong>
                          ₹{itemTotal}
                        </strong>

                      </div>


                      {/* ACTIONS */}

                      <div className="ph-cart-actions">

                        <button
                          type="button"
                          className="ph-cart-checkout-button"
                          onClick={() =>
                            handleCheckout(item)
                          }
                        >
                          <FaCreditCard />

                          <span>
                            Checkout
                          </span>

                        </button>

                        <button
                          type="button"
                          className="ph-cart-remove-button"
                          onClick={() =>
                            openRemoveModal(
                              item._id
                            )
                          }
                        >
                          <FaTrash />

                          <span>
                            Remove
                          </span>

                        </button>

                      </div>

                    </div>

                  </article>
                );
              })}

            </section>


            {/* PAGINATION */}

            {totalPages > 1 && (
              <nav
                className="ph-cart-pagination"
                aria-label="Cart pagination"
              >

                <button
                  type="button"
                  className="ph-cart-pagination-button ph-cart-pagination-arrow"
                  onClick={handlePrevious}
                  disabled={
                    currentPage === 1
                  }
                >
                  <FaArrowLeft />

                  <span>
                    Previous
                  </span>
                </button>

                <div className="ph-cart-page-numbers">

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (

                    <button
                      type="button"
                      key={page}
                      className={`ph-cart-page-number ${
                        currentPage === page
                          ? "ph-cart-page-number--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePageChange(
                          page
                        )
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
                  className="ph-cart-pagination-button ph-cart-pagination-arrow"
                  onClick={handleNext}
                  disabled={
                    currentPage ===
                    totalPages
                  }
                >
                  <span>
                    Next
                  </span>

                  <FaArrowRight />
                </button>

              </nav>
            )}

          </>
        )}

      </div>


      {/* REMOVE MODAL */}

      {showRemoveModal && (
        <div className="ph-cart-modal-overlay">

          <div className="ph-cart-modal">

            <div className="ph-cart-modal-icon">
              <FaExclamationTriangle />
            </div>

            <h2>
              Remove Product?
            </h2>

            <p>
              Are you sure you want to remove
              this product from your cart?
            </p>

            <div className="ph-cart-modal-actions">

              <button
                type="button"
                className="ph-cart-modal-cancel"
                onClick={() => {
                  setShowRemoveModal(false);
                  setSelectedCartId(null);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ph-cart-modal-danger"
                onClick={removeFromCart}
              >
                <FaTrash />
                Remove
              </button>

            </div>

          </div>

        </div>
      )}


      {/* CLEAR CART MODAL */}

      {showClearModal && (
        <div className="ph-cart-modal-overlay">

          <div className="ph-cart-modal">

            <div className="ph-cart-modal-icon">
              <FaExclamationTriangle />
            </div>

            <h2>
              Clear Your Cart?
            </h2>

            <p>
              This will remove all products from
              your cart. This action cannot be
              undone.
            </p>

            <div className="ph-cart-modal-actions">

              <button
                type="button"
                className="ph-cart-modal-cancel"
                onClick={() =>
                  setShowClearModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ph-cart-modal-danger"
                onClick={handleClearCart}
              >
                <FaTrash />
                Clear Cart
              </button>

            </div>

          </div>

        </div>
      )}


      {/* CHECKOUT MODAL */}

      {showCheckoutModal &&
        selectedCheckoutItem && (

          <div className="ph-cart-modal-overlay">

            <div className="ph-cart-checkout-modal">

              <div className="ph-cart-checkout-icon">
                <FaCreditCard />
              </div>

              <span className="ph-cart-eyebrow">
                ORDER
              </span>

              <h2>
                Ready to Checkout?
              </h2>

              <p className="ph-cart-checkout-message">
                Do you want to continue with
                this purchase?
              </p>


              {/* PRODUCT PREVIEW */}

              <div className="ph-cart-checkout-preview">

                <div className="ph-cart-checkout-image-wrapper">

                  <img
                    src={`http://localhost:8000/${selectedCheckoutItem.productId.image}`}
                    alt={
                      selectedCheckoutItem
                        .productId
                        .name
                    }
                    className="ph-cart-checkout-image"
                  />

                </div>

                <div className="ph-cart-checkout-product-info">

                  <h3>
                    {
                      selectedCheckoutItem
                        .productId
                        .name
                    }
                  </h3>

                  <span>
                    {
                      selectedCheckoutItem
                        .productId
                        .category
                    }
                  </span>

                  <p>
                    ₹
                    {
                      selectedCheckoutItem
                        .productId
                        .price
                    }
                    {" × "}
                    {
                      selectedCheckoutItem
                        .quantity
                    }
                  </p>

                </div>

              </div>


              {/* TOTAL */}

              <div className="ph-cart-checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedCheckoutItem
                      .productId
                      .price
                  ) *
                    Number(
                      selectedCheckoutItem
                        .quantity
                    )}
                </strong>

              </div>


              {/* ACTIONS */}

              <div className="ph-cart-modal-actions">

                <button
                  type="button"
                  className="ph-cart-modal-cancel"
                  onClick={() => {
                    setShowCheckoutModal(
                      false
                    );

                    setSelectedCheckoutItem(
                      null
                    );
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="ph-cart-checkout-confirm"
                  onClick={
                    continueToCheckout
                  }
                >
                  <FaCreditCard />

                  Continue to Checkout
                </button>

              </div>

            </div>

          </div>
        )}

    </main>
  );
}

export default Cart;