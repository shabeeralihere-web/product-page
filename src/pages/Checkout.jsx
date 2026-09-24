import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import CartContext from "../Context/CartContext";

import api from "../api";

import {
  FaArrowLeft,
  FaCheck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaTrash,
  
} from "react-icons/fa";

import "../Styles/Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    removeCartItem,
  } = useContext(CartContext);

  const [checkoutItems, setCheckoutItems] =
    useState(
      location.state?.cartItems || []
    );

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  const [isConfirming, setIsConfirming] =
    useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const items =
      location.state?.cartItems || [];

    setCheckoutItems(items);
  }, [location.state]);

  const getProductPrice = (item) => {
    return Number(
      item?.productId?.price || 0
    );
  };

  const getItemTotal = (item) => {
    const price = getProductPrice(item);

    const quantity = Number(
      item?.quantity || 1
    );

    return price * quantity;
  };

  const getGrandTotal = () => {
    return checkoutItems.reduce(
      (total, item) =>
        total + getItemTotal(item),
      0
    );
  };

  const getTotalQuantity = () => {
    return checkoutItems.reduce(
      (total, item) =>
        total +
        Number(item?.quantity || 1),
      0
    );
  };

  const handleAddressChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setAddress((previousAddress) => ({
      ...previousAddress,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [`deliveryAddress.${name}`]:
        "",
    }));
  };

  const removeFromSummary = async (
    cartId
  ) => {
    if (checkoutItems.length === 1) {
      toast.info(
        "At least one product is required for checkout"
      );

      return;
    }

    try {
      await removeCartItem(cartId);

      setCheckoutItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== cartId
        )
      );

      toast.success(
        "Product removed from order summary"
      );
    } catch (error) {
      toast.error(
        "Failed to remove product"
      );
    }
  };

  const handleConfirmOrder = async (
    event
  ) => {
    event.preventDefault();

    if (isConfirming) {
      return;
    }

    if (!checkoutItems.length) {
      toast.info(
        "No products available for checkout"
      );

      navigate("/cart");

      return;
    }

    setErrors({});

    try {
      setIsConfirming(true);

      const token =
        localStorage.getItem(
          "accessToken"
        );

      for (const item of checkoutItems) {
        const product =
          item.productId;

        await api.post(
          "/orders/create",
          {
            productId: product._id,
            productName: product.name,
            productImage: product.image,
            price: product.price,
            quantity: item.quantity,
            deliveryAddress: address,
            paymentMethod:
              paymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      for (const item of checkoutItems) {
        await removeCartItem(item._id);
      }

      setOrderConfirmed(true);

      toast.success(
        "Order confirmed successfully!"
      );
    } catch (error) {
      console.log(error);

      if (
        error.response?.data?.errors
      ) {
        setErrors(
          error.response.data.errors
        );

        toast.error(
          "Please fill required fields"
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to confirm order"
        );
      }
    } finally {
      setIsConfirming(false);
    }
  };

  if (
    !checkoutItems.length &&
    !orderConfirmed
  ) {
    return (
      <main className="ph-checkout-page">
        <div className="ph-checkout-container">
          <section className="ph-checkout-not-found">
            <div className="ph-checkout-not-found-icon">
              !
            </div>

            <span className="ph-checkout-eyebrow">
              CHECKOUT
            </span>

            <h1>
              No Products Selected
            </h1>

            <p>
              Your checkout does not contain
              any products.
            </p>

            <button
              type="button"
              className="ph-checkout-primary-button"
              onClick={() =>
                navigate("/cart")
              }
            >
              <FaArrowLeft />
              Go to Cart
            </button>
          </section>
        </div>
      </main>
    );
  }

  if (orderConfirmed) {
    const grandTotal =
      getGrandTotal();

    return (
      <main className="ph-checkout-success-page">
        <section className="ph-checkout-success-card">
          <div className="ph-checkout-success-icon">
            <FaCheck />
          </div>

          <span className="ph-checkout-eyebrow">
            ORDER COMPLETE
          </span>

          <h1>
            Order Confirmed!
          </h1>

          <p className="ph-checkout-success-message">
            Your order has been placed
            successfully.
          </p>

          <div className="ph-checkout-success-product">
            <span>
              {checkoutItems.length}{" "}
              {checkoutItems.length === 1
                ? "product"
                : "products"}
            </span>

            <strong>
              × {getTotalQuantity()}
            </strong>
          </div>

          <div className="ph-checkout-success-total">
            <span>
              Order Total
            </span>

            <strong>
              ₹
              {grandTotal.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="ph-checkout-success-actions">
            <button
              type="button"
              className="ph-checkout-primary-button"
              onClick={() =>
                navigate("/products")
              }
            >
              <FaShoppingBag />
              Continue Shopping
            </button>

            <button
              type="button"
              className="ph-checkout-secondary-button"
              onClick={() =>
                navigate("/cart")
              }
            >
              View Cart
            </button>
          </div>
        </section>
      </main>
    );
  }

  const grandTotal =
    getGrandTotal();

  return (
    <main className="ph-checkout-page">
      <div className="ph-checkout-container">
        <header className="ph-checkout-header">
          <button
            type="button"
            className="ph-checkout-back-link"
            onClick={() =>
              navigate("/cart")
            }
            disabled={isConfirming}
          >
            <FaArrowLeft />

            <span>
              Back to Cart
            </span>
          </button>

          <div className="ph-checkout-heading">
            <div className="ph-checkout-heading-icon">
              <FaCreditCard />
            </div>

            <div>
              <span className="ph-checkout-eyebrow">
                CHECKOUT
              </span>

              <h1>
                Complete Your Order
              </h1>

              <p>
                Review your products and
                provide your delivery details.
              </p>
            </div>
          </div>
        </header>

        <form
          className="ph-checkout-layout"
          onSubmit={handleConfirmOrder}
        >
          <div className="ph-checkout-main">
            <section className="ph-checkout-section">
              <div className="ph-checkout-section-header">
                <div className="ph-checkout-step">
                  1
                </div>

                <div>
                  <span className="ph-checkout-section-label">
                    DELIVERY
                  </span>

                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Where should we deliver
                    your order?
                  </p>
                </div>
              </div>

              <div className="ph-checkout-form-grid">
                <div className="ph-checkout-form-group ph-checkout-form-group--full">
                  <label htmlFor="checkout-fullName">
                    Full Name
                  </label>

                  <input
                    id="checkout-fullName"
                    type="text"
                    name="fullName"
                    value={
                      address.fullName
                    }
                    onChange={
                      handleAddressChange
                    }
                    placeholder="Enter your full name"
                  />

                  {errors[
                    "deliveryAddress.fullName"
                  ] && (
                    <p className="ph-checkout-error">
                      {
                        errors[
                          "deliveryAddress.fullName"
                        ]
                      }
                    </p>
                  )}
                </div>

                <div className="ph-checkout-form-group ph-checkout-form-group--full">
                  <label htmlFor="checkout-phone">
                    Phone Number
                  </label>

                  <input
                    id="checkout-phone"
                    type="tel"
                    name="phone"
                    value={
                      address.phone
                    }
                    onChange={
                      handleAddressChange
                    }
                    placeholder="Enter your phone number"
                  />

                  {errors[
                    "deliveryAddress.phone"
                  ] && (
                    <p className="ph-checkout-error">
                      {
                        errors[
                          "deliveryAddress.phone"
                        ]
                      }
                    </p>
                  )}
                </div>

                <div className="ph-checkout-form-group ph-checkout-form-group--full">
                  <label htmlFor="checkout-address">
                    Address
                  </label>

                  <textarea
                    id="checkout-address"
                    name="address"
                    value={
                      address.address
                    }
                    onChange={
                      handleAddressChange
                    }
                    placeholder="House name, street, area"
                    rows="3"
                  />

                  {errors[
                    "deliveryAddress.address"
                  ] && (
                    <p className="ph-checkout-error">
                      {
                        errors[
                          "deliveryAddress.address"
                        ]
                      }
                    </p>
                  )}
                </div>

                <div className="ph-checkout-form-group">
                  <label htmlFor="checkout-city">
                    City
                  </label>

                  <input
                    id="checkout-city"
                    type="text"
                    name="city"
                    value={
                      address.city
                    }
                    onChange={
                      handleAddressChange
                    }
                    placeholder="City"
                  />

                  {errors[
                    "deliveryAddress.city"
                  ] && (
                    <p className="ph-checkout-error">
                      {
                        errors[
                          "deliveryAddress.city"
                        ]
                      }
                    </p>
                  )}
                </div>

                <div className="ph-checkout-form-group">
                  <label htmlFor="checkout-state">
                    State
                  </label>

                  <input
                    id="checkout-state"
                    type="text"
                    name="state"
                    value={
                      address.state
                    }
                    onChange={
                      handleAddressChange
                    }
                    placeholder="State"
                  />

                  {errors[
                    "deliveryAddress.state"
                  ] && (
                    <p className="ph-checkout-error">
                      {
                        errors[
                          "deliveryAddress.state"
                        ]
                      }
                    </p>
                  )}
                </div>

                <div className="ph-checkout-form-group ph-checkout-form-group--full">
                  <label htmlFor="checkout-pinCode">
                    PIN Code
                  </label>

                  <input
                    id="checkout-pinCode"
                    type="text"
                    name="pinCode"
                    value={
                      address.pinCode
                    }
                    onChange={
                      handleAddressChange
                    }
                    placeholder="PIN Code"
                  />

                  {errors[
                    "deliveryAddress.pinCode"
                  ] && (
                    <p className="ph-checkout-error">
                      {
                        errors[
                          "deliveryAddress.pinCode"
                        ]
                      }
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="ph-checkout-section">
              <div className="ph-checkout-section-header">
                <div className="ph-checkout-step">
                  2
                </div>

                <div>
                  <span className="ph-checkout-section-label">
                    PAYMENT
                  </span>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Select your preferred
                    payment method.
                  </p>
                </div>
              </div>

              <label
                className={`ph-checkout-payment-option ${
                  paymentMethod === "cod"
                    ? "ph-checkout-payment-option--selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={
                    paymentMethod === "cod"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="ph-checkout-radio">
                  <span />
                </span>

                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <p>
                    Pay when your order
                    arrives.
                  </p>
                </div>
              </label>

              <label
                className={`ph-checkout-payment-option ${
                  paymentMethod === "upi"
                    ? "ph-checkout-payment-option--selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={
                    paymentMethod === "upi"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="ph-checkout-radio">
                  <span />
                </span>

                <div>
                  <strong>
                    UPI
                  </strong>

                  <p>
                    Pay using a UPI app.
                  </p>
                </div>
              </label>

              <label
                className={`ph-checkout-payment-option ${
                  paymentMethod === "card"
                    ? "ph-checkout-payment-option--selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={
                    paymentMethod === "card"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="ph-checkout-radio">
                  <span />
                </span>

                <div>
                  <strong>
                    Credit / Debit Card
                  </strong>

                  <p>
                    Pay using your card.
                  </p>
                </div>
              </label>

              <label
                className={`ph-checkout-payment-option ${
                  paymentMethod ===
                  "netbanking"
                    ? "ph-checkout-payment-option--selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={
                    paymentMethod ===
                    "netbanking"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="ph-checkout-radio">
                  <span />
                </span>

                <div>
                  <strong>
                    Net Banking
                  </strong>

                  <p>
                    Pay using your bank
                    account.
                  </p>
                </div>
              </label>
            </section>
          </div>

          <aside className="ph-checkout-sidebar">
            <section className="ph-checkout-summary">
              <div className="ph-checkout-summary-header">
                <div>
                  <span className="ph-checkout-section-label">
                    YOUR ORDER
                  </span>

                  <h2>
                    Order Summary
                  </h2>
                </div>

                <span className="ph-checkout-product-count">
                  {checkoutItems.length}{" "}
                  {checkoutItems.length === 1
                    ? "Product"
                    : "Products"}
                </span>
              </div>

              <div className="ph-checkout-product-list">
                {checkoutItems.map(
                  (item) => {
                    const product =
                      item.productId;

                    if (!product) {
                      return null;
                    }

                    return (
                      <div
                        className="ph-checkout-product"
                        key={item._id}
                      >
                        <div className="ph-checkout-product-image">
                          <img
                            src={
                              product.image?.startsWith(
                                "http"
                              )
                                ? product.image
                                : `/${product.image}`
                            }
                            alt={
                              product.name
                            }
                          />
                        </div>

                        <div className="ph-checkout-product-info">
                          <span>
                            {
                              product.category
                            }
                          </span>

                          <h3>
                            {
                              product.name
                            }
                          </h3>

                          <p>
                            ₹
                            {Number(
                              product.price
                            ).toLocaleString(
                              "en-IN"
                            )}{" "}
                            ×{" "}
                            {
                              item.quantity
                            }
                          </p>

                          <strong>
                            ₹
                            {getItemTotal(
                              item
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </div>

                        <button
                          type="button"
                          className="ph-checkout-product-remove"
                          onClick={() =>
                            removeFromSummary(
                              item._id
                            )
                          }
                          disabled={
                            isConfirming
                          }
                          title="Remove product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="ph-checkout-price-details">
                <div>
                  <span>
                    Products
                  </span>

                  <span>
                    {getTotalQuantity()}
                  </span>
                </div>

                <div>
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {grandTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div>
                  <span>
                    Delivery
                  </span>

                  <span className="ph-checkout-free">
                    FREE
                  </span>
                </div>

                <div className="ph-checkout-grand-total">
                  <strong>
                    Total
                  </strong>

                  <strong>
                    ₹
                    {grandTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>

              <div className="ph-checkout-info-note">
                <FaMapMarkerAlt />

                <span>
                  Your products will be
                  delivered to the address
                  provided above.
                </span>
              </div>

              <button
                type="submit"
                className="ph-checkout-confirm-button"
                disabled={isConfirming}
              >
                <FaCheck />

                {isConfirming
                  ? "Confirming Order..."
                  : "Confirm Order"}
              </button>

              <button
                type="button"
                className="ph-checkout-sidebar-back"
                onClick={() =>
                  navigate("/cart")
                }
                disabled={isConfirming}
              >
                Back to Cart
              </button>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;