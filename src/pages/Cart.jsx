import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CartContext from "../Context/CartContext";

import {
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaShoppingCart,
  FaTrash,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

import "../Styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    getCart,
    getAllCartItems,
    updateCartQuantity,
    removeCartItem,
    clearCart,
  } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] =
    useState(false);

  const [showRemoveModal, setShowRemoveModal] =
    useState(false);

  const [showClearModal, setShowClearModal] =
    useState(false);

  const [selectedCartId, setSelectedCartId] =
    useState(null);

  const loadCart = useCallback(
    async (page) => {
      try {
        setIsLoading(true);

        const response = await getCart(page);

        if (response?.pagination) {
          setTotalPages(
            response.pagination.totalPages || 1
          );
        } else {
          setTotalPages(1);
        }
      } catch (error) {
        console.log("LOAD CART ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [getCart]
  );

  useEffect(() => {
    loadCart(currentPage);
  }, [currentPage, loadCart]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleQuantityChange = async (
    cartId,
    currentQuantity,
    change
  ) => {
    const newQuantity =
      currentQuantity + change;

    if (newQuantity < 1) {
      return;
    }

    try {
      await updateCartQuantity(
        cartId,
        newQuantity
      );
    } catch (error) {
      toast.error(
        "Unable to update quantity"
      );
    }
  };

  const handleRemoveClick = (cartId) => {
    setSelectedCartId(cartId);
    setShowRemoveModal(true);
  };

  const confirmRemove = async () => {
    if (!selectedCartId) {
      return;
    }

    try {
      await removeCartItem(
        selectedCartId
      );

      setShowRemoveModal(false);
      setSelectedCartId(null);

      if (
        cartItems.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          (previousPage) =>
            previousPage - 1
        );
      } else {
        await loadCart(currentPage);
      }
    } catch (error) {
      toast.error(
        "Unable to remove product"
      );
    }
  };

  const confirmClearCart = async () => {
    try {
      await clearCart();

      setShowClearModal(false);
      setCurrentPage(1);
      setTotalPages(1);
    } catch (error) {
      toast.error(
        "Unable to clear cart"
      );
    }
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const allItems =
        await getAllCartItems();

      console.log(
        "ALL CART ITEMS:",
        allItems
      );

      if (!allItems.length) {
        toast.error(
          "Your cart is empty"
        );
        return;
      }

      navigate("/checkout", {
        state: {
          cartItems: allItems,
        },
      });
    } catch (error) {
      console.log(
        "CHECKOUT ERROR:",
        error
      );

      toast.error(
        "Unable to continue to checkout"
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(
        (previousPage) =>
          previousPage - 1
      );
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (previousPage) =>
          previousPage + 1
      );
    }
  };

  if (
    isLoading &&
    cartItems.length === 0 &&
    cartCount === 0
  ) {
    return (
      <main className="ph-cart-page">
        <div className="ph-cart-container">
          <div className="ph-cart-loading">
            <div className="ph-cart-loading-spinner"></div>

            <p>
              Loading your cart...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (
    !isLoading &&
    cartItems.length === 0 &&
    cartCount === 0
  ) {
    return (
      <main className="ph-cart-page">
        <div className="ph-cart-container">
          <section className="ph-cart-empty">
            <div className="ph-cart-empty-icon">
              <FaShoppingCart />
            </div>

            <span className="ph-cart-empty-eyebrow">
              YOUR CART
            </span>

            <h1>
              Your cart is empty
            </h1>

            <p>
              Looks like you haven't
              added anything to your
              cart yet.
            </p>

            <button
              className="ph-cart-empty-button"
              onClick={
                handleContinueShopping
              }
            >
              <FaShoppingBag />
              Continue Shopping
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="ph-cart-page">
      <div className="ph-cart-container">
        <header className="ph-cart-header">
          <button
            className="ph-cart-back-button"
            onClick={
              handleContinueShopping
            }
          >
            <FaArrowLeft />
            Continue Shopping
          </button>

          <div className="ph-cart-title-row">
            <div className="ph-cart-title-icon">
              <FaShoppingCart />
            </div>

            <div>
              <span className="ph-cart-eyebrow">
                YOUR SHOPPING BAG
              </span>

              <h1 className="ph-cart-title">
                Shopping Cart
              </h1>

              <p className="ph-cart-subtitle">
                Review your products
                before proceeding to
                checkout.
              </p>
            </div>
          </div>

          <div className="ph-cart-header-actions">
            <span className="ph-cart-item-count">
              {cartCount}{" "}
              {cartCount === 1
                ? "Item"
                : "Items"}
            </span>

            {cartCount > 0 && (
              <button
                className="ph-cart-clear-button"
                onClick={() =>
                  setShowClearModal(true)
                }
              >
                <FaTrash />
                Clear Cart
              </button>
            )}
          </div>
        </header>

        <section className="ph-cart-summary">
          <div className="ph-cart-summary-item">
            <div className="ph-cart-summary-icon">
              <FaBoxOpen />
            </div>

            <div>
              <span>
                Total Products
              </span>

              <strong>
                {cartCount}
              </strong>
            </div>
          </div>

          <div className="ph-cart-summary-item">
            <div className="ph-cart-summary-icon">
              <FaShoppingBag />
            </div>

            <div>
              <span>
                Current Page
              </span>

              <strong>
                {currentPage} /{" "}
                {totalPages}
              </strong>
            </div>
          </div>

          <div className="ph-cart-summary-item">
            <div className="ph-cart-summary-icon">
              <FaShoppingCart />
            </div>

            <div>
              <span>
                Checkout
              </span>

              <strong>
                {cartCount > 0
                  ? "Ready"
                  : "Empty"}
              </strong>
            </div>
          </div>
        </section>

        {isLoading && (
          <div className="ph-cart-page-status">
            <div className="ph-cart-small-spinner"></div>
            Updating your cart...
          </div>
        )}

        <section className="ph-cart-grid">
          {cartItems.map((item) => {
            const product =
              item.productId;

            if (!product) {
              return null;
            }

            const productImage =
              product.image
                ? `/${product.image.replace(
                    /\\/g,
                    "/"
                  )}`
                : "";

            const itemTotal =
              Number(
                product.price || 0
              ) *
              Number(
                item.quantity || 1
              );

            return (
              <article
                className="ph-cart-card"
                key={item._id}
                onClick={() =>
                  handleProductClick(
                    product._id
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key ===
                      "Enter" ||
                    event.key === " "
                  ) {
                    handleProductClick(
                      product._id
                    );
                  }
                }}
              >
                <div className="ph-cart-image-wrapper">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={product.name}
                      className="ph-cart-image"
                    />
                  ) : (
                    <div className="ph-cart-image-placeholder">
                      <FaShoppingBag />
                    </div>
                  )}

                  <div className="ph-cart-image-overlay">
                    View Product
                  </div>
                </div>

                <div className="ph-cart-card-content">
                  <span className="ph-cart-category">
                    {product.category ||
                      "Product"}
                  </span>

                  <h2 className="ph-cart-product-name">
                    {product.name}
                  </h2>

                  <p className="ph-cart-product-price">
                    ₹
                    {Number(
                      product.price || 0
                    ).toFixed(2)}
                  </p>

                  <div
                    className="ph-cart-quantity-row"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <span>
                      Quantity
                    </span>

                    <div className="ph-cart-quantity-control">
                      <button
                        className="ph-cart-quantity-button"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleQuantityChange(
                            item._id,
                            item.quantity,
                            -1
                          );
                        }}
                        disabled={
                          item.quantity <=
                          1
                        }
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>

                      <span className="ph-cart-quantity-value">
                        {item.quantity}
                      </span>

                      <button
                        className="ph-cart-quantity-button"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleQuantityChange(
                            item._id,
                            item.quantity,
                            1
                          );
                        }}
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="ph-cart-total-row">
                    <span>
                      Item Total
                    </span>

                    <strong>
                      ₹
                      {itemTotal.toFixed(
                        2
                      )}
                    </strong>
                  </div>

                  <div
                    className="ph-cart-actions"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <button
                      className="ph-cart-remove-button"
                      onClick={() =>
                        handleRemoveClick(
                          item._id
                        )
                      }
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {totalPages > 1 && (
          <div className="ph-cart-pagination">
            <button
              className="ph-cart-pagination-button"
              onClick={
                handlePreviousPage
              }
              disabled={
                currentPage === 1
              }
            >
              Previous
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
                  key={page}
                  className={`ph-cart-page-number ${
                    currentPage === page
                      ? "ph-cart-page-number--active"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="ph-cart-pagination-button"
              onClick={
                handleNextPage
              }
              disabled={
                currentPage ===
                totalPages
              }
            >
              Next
            </button>
          </div>
        )}

        <section className="ph-cart-checkout-section">
          <div className="ph-cart-checkout-content">
            <div className="ph-cart-checkout-icon">
              <FaShoppingBag />
            </div>

            <div>
              <span className="ph-cart-checkout-eyebrow">
                READY TO ORDER?
              </span>

              <h2>
                Complete your purchase
              </h2>

              <p>
                {cartCount}{" "}
                {cartCount === 1
                  ? "product"
                  : "products"}{" "}
                will be included in
                your checkout.
              </p>
            </div>
          </div>

          <button
            className="ph-cart-checkout-main-button"
            onClick={
              handleCheckout
            }
            disabled={
              isCheckingOut ||
              cartCount === 0
            }
          >
            <span>
              {isCheckingOut
                ? "Preparing Checkout..."
                : "Proceed to Checkout"}
            </span>

            {!isCheckingOut && (
              <FaArrowRight />
            )}
          </button>
        </section>
      </div>

      {showRemoveModal && (
        <div
          className="ph-cart-modal-overlay"
          onClick={() =>
            setShowRemoveModal(
              false
            )
          }
        >
          <div
            className="ph-cart-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="ph-cart-modal-icon">
              <FaTrash />
            </div>

            <h2>
              Remove Product?
            </h2>

            <p>
              Are you sure you want
              to remove this product
              from your cart?
            </p>

            <div className="ph-cart-modal-actions">
              <button
                className="ph-cart-modal-cancel"
                onClick={() =>
                  setShowRemoveModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="ph-cart-modal-confirm"
                onClick={
                  confirmRemove
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearModal && (
        <div
          className="ph-cart-modal-overlay"
          onClick={() =>
            setShowClearModal(
              false
            )
          }
        >
          <div
            className="ph-cart-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="ph-cart-modal-icon">
              <FaTrash />
            </div>

            <h2>
              Clear Cart?
            </h2>

            <p>
              This will remove all
              products from your
              shopping cart.
            </p>

            <div className="ph-cart-modal-actions">
              <button
                className="ph-cart-modal-cancel"
                onClick={() =>
                  setShowClearModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="ph-cart-modal-confirm"
                onClick={
                  confirmClearCart
                }
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;