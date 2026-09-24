import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheck,
  FaEdit,
  FaImage,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import api from "../api";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

import "../Styles/EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { role } = useAuth();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [oldImage, setOldImage] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);

        const response = await api.get(
          `/products/getProduct/${id}`
        );

        console.log(response.data);

        const product = response.data.data;

        setProductName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setOldImage(product.image);
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load product"
        );
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  function handleImageChange(e) {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);
  }

  function handleRemoveNewImage(e) {
    e.preventDefault();
    e.stopPropagation();

    setImage(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!productName.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    const formData = new FormData();

    formData.append("name", productName);
    formData.append("price", price);
    formData.append("category", category);

    // Only send image when a new image is selected.
    if (image) {
      formData.append("image", image);
    }

    try {
      setIsSaving(true);

      const token = localStorage.getItem("accessToken");

      const response = await api.put(
        `/products/updateProduct/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      toast.success("Product updated successfully!");

      if (role === "seller") {
        navigate("/seller-dashboard/my-products");
      } else if (role === "admin") {
        navigate("/products");
      }
    } catch (error) {
      console.log("UPDATE PRODUCT ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  if (isLoading) {
    return (
      <main className="edit-product-page">
        <div className="edit-product-page__glow edit-product-page__glow--one" />
        <div className="edit-product-page__glow edit-product-page__glow--two" />

        <div className="edit-product-loading">
          <div className="edit-product-loading__spinner" />

          <h2>Loading product...</h2>

          <p>
            Please wait while we load the product
            information.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="edit-product-page">
      <div className="edit-product-page__glow edit-product-page__glow--one" />
      <div className="edit-product-page__glow edit-product-page__glow--two" />

      <div className="edit-product-container">
        <div className="edit-product-header">
          <button
            type="button"
            className="edit-product-back"
            onClick={handleCancel}
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <div className="edit-product-heading">
            <div className="edit-product-heading__icon">
              <FaEdit />
            </div>

            <div>
              <span className="edit-product-eyebrow">
                PRODUCT MANAGEMENT
              </span>

              <h1>Edit Product</h1>

              <p>
                Update your product information and
                keep your listing up to date.
              </p>
            </div>
          </div>
        </div>

        <section className="edit-product-card">
          <div className="edit-product-card__header">
            <div>
              <span className="edit-product-card__label">
                PRODUCT INFORMATION
              </span>

              <h2>Update product details</h2>

              <p>
                Make your changes below and save when
                you are finished.
              </p>
            </div>

            <div className="edit-product-card__status">
              <span />
              Editing product
            </div>
          </div>

          <form
            className="edit-product-form"
            onSubmit={handleSubmit}
          >
            <div className="edit-product-field">
              <label className="edit-product-label">
                Product image
              </label>

              <input
                id="edit-product-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="edit-product-file-input"
              />

              <label
                htmlFor="edit-product-image"
                className={`edit-product-upload ${
                  image
                    ? "edit-product-upload--selected"
                    : ""
                }`}
              >
                {image ? (
                  <div className="edit-product-preview">
                    <div className="edit-product-preview__image">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="New product"
                      />
                    </div>

                    <div className="edit-product-preview__info">
                      <span className="edit-product-preview__badge">
                        <FaCheck />
                        New image selected
                      </span>

                      <strong>
                        {image.name}
                      </strong>

                      <span>
                        Click anywhere to choose another
                        image
                      </span>
                    </div>

                    <button
                      type="button"
                      className="edit-product-preview__remove"
                      onClick={handleRemoveNewImage}
                      aria-label="Remove selected image"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="edit-product-preview">
                    <div className="edit-product-preview__image">
                      {oldImage ? (
                        <img
                          src={`/${oldImage}`}
                          alt="Current product"
                        />
                      ) : (
                        <FaImage />
                      )}
                    </div>

                    <div className="edit-product-preview__info">
                      <span className="edit-product-preview__badge edit-product-preview__badge--current">
                        <FaCheck />
                        Current image
                      </span>

                      <strong>
                        Product image
                      </strong>

                      <span>
                        Click anywhere to choose a new
                        image
                      </span>
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div className="edit-product-section">
              <div className="edit-product-section__heading">
                <div className="edit-product-section__icon">
                  <FaBoxOpen />
                </div>

                <div>
                  <h3>Basic information</h3>

                  <p>
                    Update the information customers
                    see on your product.
                  </p>
                </div>
              </div>

              <div className="edit-product-fields-grid">
                <div className="edit-product-field edit-product-field--full">
                  <label
                    htmlFor="edit-product-name"
                    className="edit-product-label"
                  >
                    Product name
                  </label>

                  <input
                    id="edit-product-name"
                    type="text"
                    value={productName}
                    onChange={(e) =>
                      setProductName(e.target.value)
                    }
                    placeholder="Enter product name"
                    className="edit-product-input"
                  />
                </div>

                <div className="edit-product-field">
                  <label
                    htmlFor="edit-product-price"
                    className="edit-product-label"
                  >
                    Price
                  </label>

                  <div className="edit-product-price-wrapper">
                    <span>₹</span>

                    <input
                      id="edit-product-price"
                      type="number"
                      min="1"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      placeholder="0.00"
                      className="edit-product-input"
                    />
                  </div>
                </div>

                <div className="edit-product-field">
                  <label
                    htmlFor="edit-product-category"
                    className="edit-product-label"
                  >
                    Category
                  </label>

                  <select
                    id="edit-product-category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="edit-product-input"
                  >
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
                </div>
              </div>
            </div>

            <div className="edit-product-actions">
              <button
                type="button"
                className="edit-product-cancel"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-product-submit"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="edit-product-submit__spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <div className="edit-product-note">
          <FaImage />

          <span>
            If you do not select a new image, your
            current product image will remain unchanged.
          </span>
        </div>
      </div>
    </main>
  );
}

export default EditProduct;