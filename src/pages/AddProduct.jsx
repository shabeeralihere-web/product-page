import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheck,
  FaCloudUploadAlt,
  FaImage,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import api from "../api";
import { useAuth } from "../Context/AuthContext";

import "../Styles/AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const { role } = useAuth();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  // ================= SUBMIT PRODUCT =================

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    if (price === "") {
      newErrors.price = "Price is required";
    } else if (Number(price) <= 0) {
      newErrors.price =
        "Price must be greater than 0";
    }

    if (category === "") {
      newErrors.category =
        "Please select a category";
    }

    if (!image) {
      newErrors.image =
        "Image is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    const token =
      localStorage.getItem("accessToken");

    try {
      await api.post(
        "http://localhost:8000/api/products/addProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setPrice("");
      setCategory("");
      setImage(null);
      setErrors({});

      if (role === "seller") {
        navigate(
          "/seller-dashboard/my-products"
        );
      } else if (role === "admin") {
        navigate("/products");
      }
    } catch (error) {
      console.log(
        "ADD PRODUCT ERROR:",
        error
      );

      if (error.response?.data?.errors) {
        const backendErrors = {};

        error.response.data.errors.forEach(
          (errorItem) => {
            backendErrors[errorItem.path] =
              errorItem.msg;
          }
        );

        setErrors(backendErrors);
      } else {
        setErrors({
          submit:
            error.response?.data?.message ||
            "Failed to add product",
        });
      }
    }
  }

  // ================= IMAGE CHANGE =================

  function handleImageChange(e) {
    const selectedImage =
      e.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    setErrors((previousErrors) => ({
      ...previousErrors,
      image: "",
    }));
  }

  function handleRemoveImage(e) {
    e.preventDefault();
    e.stopPropagation();

    setImage(null);

    setErrors((previousErrors) => ({
      ...previousErrors,
      image: "",
    }));
  }

  return (
    <main className="add-product-page">

      <div className="add-product-page__glow add-product-page__glow--one" />
      <div className="add-product-page__glow add-product-page__glow--two" />

      <div className="add-product-container">

        {/* ================= HEADER ================= */}

        <div className="add-product-header">

          <button
            type="button"
            className="add-product-back"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <div className="add-product-heading">

            <div className="add-product-heading__icon">
              <FaPlus />
            </div>

            <div>
              <span className="add-product-eyebrow">
                PRODUCT MANAGEMENT
              </span>

              <h1>Add Product</h1>

              <p>
                Add a new product to your
                ProductHub collection.
              </p>
            </div>

          </div>

        </div>

        {/* ================= FORM CARD ================= */}

        <section className="add-product-card">

          <div className="add-product-card__header">

            <div>
              <span className="add-product-card__label">
                PRODUCT INFORMATION
              </span>

              <h2>
                Product details
              </h2>

              <p>
                Enter the information below to
                publish your product.
              </p>
            </div>

            <div className="add-product-card__status">
              <span />
              New product
            </div>

          </div>

          <form
            className="add-product-form"
            onSubmit={handleSubmit}
          >

            {/* ================= IMAGE ================= */}

            <div className="add-product-field">

              <label className="add-product-label">
                Product image
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="add-product-file-input"
              />

              <label
                htmlFor="product-image"
                className={`add-product-upload ${
                  image
                    ? "add-product-upload--selected"
                    : ""
                }`}
              >

                {image ? (
                  <div className="add-product-preview">

                    <div className="add-product-preview__image">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected product"
                      />
                    </div>

                    <div className="add-product-preview__info">

                      <span className="add-product-preview__badge">
                        <FaCheck />
                        Image selected
                      </span>

                      <strong>
                        {image.name}
                      </strong>

                      <span>
                        Click anywhere to change
                        the image
                      </span>

                    </div>

                    <button
                      type="button"
                      className="add-product-preview__remove"
                      onClick={handleRemoveImage}
                      aria-label="Remove image"
                    >
                      <FaTimes />
                    </button>

                  </div>
                ) : (
                  <div className="add-product-upload__content">

                    <div className="add-product-upload__icon">
                      <FaCloudUploadAlt />
                    </div>

                    <strong>
                      Upload product image
                    </strong>

                    <span>
                      Click to choose an image
                    </span>

                    <small>
                      JPG, PNG or other image formats
                    </small>

                  </div>
                )}

              </label>

              {errors.image && (
                <p className="add-product-error">
                  {errors.image}
                </p>
              )}

            </div>

            {/* ================= BASIC DETAILS ================= */}

            <div className="add-product-section">

              <div className="add-product-section__heading">
                <div className="add-product-section__icon">
                  <FaBoxOpen />
                </div>

                <div>
                  <h3>Basic information</h3>
                  <p>
                    Tell customers about your product.
                  </p>
                </div>
              </div>

              <div className="add-product-fields-grid">

                {/* NAME */}

                <div className="add-product-field add-product-field--full">

                  <label
                    htmlFor="product-name"
                    className="add-product-label"
                  >
                    Product name
                  </label>

                  <input
                    id="product-name"
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      setErrors((previousErrors) => ({
                        ...previousErrors,
                        name: "",
                      }));
                    }}
                    className={
                      errors.name
                        ? "add-product-input add-product-input--error"
                        : "add-product-input"
                    }
                  />

                  {errors.name && (
                    <p className="add-product-error">
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* PRICE */}

                <div className="add-product-field">

                  <label
                    htmlFor="product-price"
                    className="add-product-label"
                  >
                    Price
                  </label>

                  <div className="add-product-price-wrapper">

                    <span>₹</span>

                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);

                        setErrors((previousErrors) => ({
                          ...previousErrors,
                          price: "",
                        }));
                      }}
                      className={
                        errors.price
                          ? "add-product-input add-product-input--error"
                          : "add-product-input"
                      }
                    />

                  </div>

                  {errors.price && (
                    <p className="add-product-error">
                      {errors.price}
                    </p>
                  )}

                </div>

                {/* CATEGORY */}

                <div className="add-product-field">

                  <label
                    htmlFor="product-category"
                    className="add-product-label"
                  >
                    Category
                  </label>

                  <select
                    id="product-category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);

                      setErrors((previousErrors) => ({
                        ...previousErrors,
                        category: "",
                      }));
                    }}
                    className={
                      errors.category
                        ? "add-product-input add-product-input--error"
                        : "add-product-input"
                    }
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Mobiles">
                      Mobiles
                    </option>

                    <option value="Computers">
                      Computers
                    </option>

                    <option value="Audio">
                      Audio
                    </option>

                    <option value="Accessories">
                      Accessories
                    </option>

                  </select>

                  {errors.category && (
                    <p className="add-product-error">
                      {errors.category}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* ================= SUBMIT ERROR ================= */}

            {errors.submit && (
              <div className="add-product-submit-error">
                <span>!</span>
                <p>{errors.submit}</p>
              </div>
            )}

            {/* ================= ACTIONS ================= */}

            <div className="add-product-actions">

              <button
                type="button"
                className="add-product-cancel"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="add-product-submit"
              >
                <FaPlus />
                Add Product
              </button>

            </div>

          </form>

        </section>

        {/* ================= FOOT NOTE ================= */}

        <div className="add-product-note">
          <FaImage />
          <span>
            Make sure your product image clearly
            represents the product you are adding.
          </span>
        </div>

      </div>

    </main>
  );
}

export default AddProduct;