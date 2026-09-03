import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ products }) {

  const { name } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.name === name
  );

  if (!product) {
    return (
      <div className="details-page">

        <div className="not-found">
          <h2>Product Not Found</h2>

          <button
            onClick={() => navigate("/products")}
            className="back-button"
          >
            Back to Products
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="details-page">

      <div className="details-card">

        <div className="details-image-container">

          <img
            src={product.image}
            alt={product.name}
            className="details-image"
          />

        </div>


        <div className="details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <h2>
            ₹{product.price}
          </h2>

          <p className="details-description">
            This product is available in our product
            collection. You can manage this product
            from the products page.
          </p>

          <button
            className="back-button"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;