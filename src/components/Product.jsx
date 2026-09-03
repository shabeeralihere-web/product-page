import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Product({
  name,
  price,
  category,
  image,
  deleteProduct
}) {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);


  // View product
  function handleView() {
    navigate(`/product/${name}`);
  }


  // Edit product
  function handleEdit() {
    navigate(`/edit-product/${name}`);
  }


  // Delete product
  function handleDelete() {
    deleteProduct(name);
    setShowModal(false);
  }


  return (
    <>

      <div className="product-card">

        {/* Product Image */}

        <img
          className="product-image"
          src={image}
          alt={name}
        />


        {/* Product Information */}

        <div className="product-info">

          <p className="product-category">
            {category}
          </p>

          <h2>
            {name}
          </h2>

          <p className="product-price">
            ₹{price}
          </p>

        </div>


        {/* Buttons */}

        <div className="product-actions">

          <button
            className="view-button"
            onClick={handleView}
          >
            View
          </button>

          <button
            className="edit-button"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>

        </div>

      </div>


      {/* Delete Confirmation Modal */}

      {showModal && (

        <div className="modal">

          <div className="modal-content">

            <h2>
              Delete Product?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{name}</strong>?
            </p>


            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );
}

export default Product;
