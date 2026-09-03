import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct({ products, setProducts }) {

  const { name } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.name === name);

  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      price: price,
      category: category,
      image: image
    };

    const updatedProducts = products.map((item) => {

      if (item.name === name) {
        return updatedProduct;
      }

      return item;
    });

    setProducts(updatedProducts);

    navigate("/products");
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