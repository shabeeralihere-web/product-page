import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get product when page loads
  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `http://localhost:8000/api/products/getProduct/${id}`
        );

        console.log(response.data);

        setProduct(response.data.data);
      } catch (error) {
        console.log(error);

        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="details-page">
        <div className="details-loading">
          <div className="loading-spinner"></div>

          <p>
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="details-page">
        <div className="not-found">

          <div className="not-found-icon">
            !
          </div>

          <h2>
            Product Not Found
          </h2>

          <p>
            The product you're looking for could not be found.
          </p>

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

        {/* Product Image */}
        <div className="details-image-container">

          <img
            src={product.image}
            alt={product.name}
            className="details-image"
          />

        </div>

        {/* Product Information */}
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