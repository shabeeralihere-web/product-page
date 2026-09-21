import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (price === "") {
      newErrors.price = "Price is required";
    } else if (Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (category === "") {
      newErrors.category = "Please select a category";
    }

    if (image.trim() === "") {
      newErrors.image = "Image URL is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }


  // validation...

  const newProduct = {
    name: name,
    price: price,
    category: category,
    image: image
  };

  const token = localStorage.getItem("accessToken");

console.log("TOKEN:", token);
 await axios.post(
  "http://localhost:8000/api/products/addProduct",
  newProduct,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  }
);

  setName("");
  setPrice("");
  setCategory("");
  setImage("");
  setErrors({});

  navigate("/products");
}
  return (
    <div className="form-page">

      <div className="form-container">

        <div className="form-header">

          <p>PRODUCT MANAGEMENT</p>

          <h1>Add Product</h1>

          <span>
            Add a new product to your collection.
          </span>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <p className="error">{errors.name}</p>
            )}

          </div>


          {/* Price */}

          <div className="form-group">

            <label>Price</label>

            <input
              type="number"
              min=""
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {errors.price && (
              <p className="error">{errors.price}</p>
            )}

          </div>


          {/* Category */}

          <div className="form-group">

            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <p className="error">{errors.category}</p>
            )}

          </div>


          {/* Image */}

          <div className="form-group">

            <label>Image URL</label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {errors.image && (
              <p className="error">{errors.image}</p>
            )}

          </div>    


          <button
            type="submit"
            className="add-product-button"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;