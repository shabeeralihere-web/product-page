import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CartContext from "../Context/CartContext";
import api from "../api";

import {
  FaArrowLeft,
  FaCheck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaShoppingBag,
} from "react-icons/fa";

import "../Styles/Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { removeCartItem } = useContext(CartContext);

  const { cartId, product, quantity } =
    location.state || {};

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

  if (!cartId || !product) {
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
              Checkout Information Not Found
            </h1>

            <p>
              Please select a product from your cart
              before going to checkout.
            </p>

            <button
              type="button"
              className="ph-checkout-primary-button"
              onClick={() => navigate("/cart")}
            >
              <FaArrowLeft />
              Go to Cart
            </button>

          </section>
        </div>
      </main>
    );
  }

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setAddress((previousAddress) => ({
      ...previousAddress,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [`deliveryAddress.${name}`]: "",
    }));
  };

  const productPrice = Number(product.price);

  const itemTotal =
    productPrice * Number(quantity);

  const deliveryCharge = 0;

  const grandTotal =
    itemTotal + deliveryCharge;

  const handleConfirmOrder = async (event) => {
    event.preventDefault();

    if (isConfirming) {
      return;
    }

    setErrors({});

    try {
      setIsConfirming(true);

      const token =
        localStorage.getItem("accessToken");

      await api.post(
        "http://localhost:8000/api/orders/create",
        {
          productId: product._id,
          productName: product.name,
          productImage: product.image,
          price: product.price,
          quantity: quantity,
          deliveryAddress: address,
          paymentMethod: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await removeCartItem(cartId);

      setOrderConfirmed(true);

      toast.success(
        "Order confirmed successfully!"
      );
    } catch (error) {
      console.log(error);

      if (error.response?.data?.errors) {
        setErrors(
          error.response.data.errors
        );

        toast.error(
          "Please fix the validation errors"
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

  if (orderConfirmed) {
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
            Your order has been placed successfully.
          </p>

          <div className="ph-checkout-success-product">
            <span>
              {product.name}
            </span>

            <strong>
              × {quantity}
            </strong>
          </div>

          <div className="ph-checkout-success-total">

            <span>
              Order Total
            </span>

            <strong>
              ₹{grandTotal}
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

  return (
    <main className="ph-checkout-page">

      <div className="ph-checkout-container">

        {/* HEADER */}

        <header className="ph-checkout-header">

          <button
            type="button"
            className="ph-checkout-back-link"
            onClick={() =>
              navigate("/cart")
            }
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
                Review your product and provide
                your delivery details.
              </p>

            </div>

          </div>

        </header>


        {/* CHECKOUT FORM */}

        <form
          className="ph-checkout-layout"
          onSubmit={handleConfirmOrder}
        >

          {/* LEFT SIDE */}

          <div className="ph-checkout-main">


            {/* DELIVERY ADDRESS */}

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
                    Where should we deliver your
                    order?
                  </p>
                </div>

              </div>


              <div className="ph-checkout-form-grid">

                {/* FULL NAME */}

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


                {/* PHONE */}

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


                {/* ADDRESS */}

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


                {/* CITY */}

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


                {/* STATE */}

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


                {/* PIN CODE */}

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


            {/* PAYMENT */}

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
                    Select your preferred payment
                    method.
                  </p>

                </div>

              </div>


              {/* COD */}

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
                    Pay when your order arrives.
                  </p>
                </div>

              </label>


              {/* UPI */}

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


              {/* CARD */}

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


              {/* NET BANKING */}

              <label
                className={`ph-checkout-payment-option ${
                  paymentMethod === "netbanking"
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
                    Pay using your bank account.
                  </p>
                </div>

              </label>

            </section>

          </div>


          {/* RIGHT SIDE */}

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
                  1 Product
                </span>

              </div>


              {/* PRODUCT */}

              <div className="ph-checkout-product">

                <div className="ph-checkout-product-image">

                  <img
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.name}
                  />

                </div>

                <div className="ph-checkout-product-info">

                  <span>
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    ₹{product.price} ×{" "}
                    {quantity}
                  </p>

                </div>

              </div>


              {/* PRICE DETAILS */}

              <div className="ph-checkout-price-details">

                <div>
                  <span>
                    Product Total
                  </span>

                  <span>
                    ₹{itemTotal}
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
                    ₹{grandTotal}
                  </strong>

                </div>

              </div>


              {/* DELIVERY INFO */}

              <div className="ph-checkout-info-note">

                <FaMapMarkerAlt />

                <span>
                  Your order will be delivered to
                  the address provided above.
                </span>

              </div>


              {/* CONFIRM */}

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