import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Get product when page loads
  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/getProduct/${id}`
        );

        console.log(response.data);

        const product = response.data.data;

        setProductName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();
  }, [id]);

  // Update product
  async function handleSubmit(e) {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      price: price,
      category: category,
      image: image
    };

    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.put(
        `http://localhost:8000/api/products/updateProduct/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-page">
      <div className="form-container">

        <div className="form-header">
          <p>PRODUCT MANAGEMENT</p>

          <h1>Edit Product</h1>

          <span>
            Update your product information.
          </span>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          {/* Image */}
          <div className="form-group">
            <label>Image URL</label>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="add-product-button"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditProduct;