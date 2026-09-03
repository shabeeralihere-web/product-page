import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-text">
            PRODUCT MANAGEMENT
          </p>

          <h1>
            Manage Your Products
            <br />
            Easily & Efficiently
          </h1>

          <p className="hero-description">
            Add, edit, view and delete your products
            from one simple and organized application.
          </p>

          <div className="hero-buttons">

            <Link to="/products" className="primary-button">
              View Products
            </Link>

            <Link to="/add-product" className="secondary-button">
              Add Product
            </Link>

          </div>

        </div>

      </section>


      <section className="about">

        <h2>Everything You Need</h2>

        <p className="about-description">
          ProductHub helps you keep your product information
          organized and easy to manage.
        </p>


        <div className="features">

          <div className="feature-card">
            <h3>Add Products</h3>
            <p>
              Easily add new products with name, price,
              category and image.
            </p>
          </div>


          <div className="feature-card">
            <h3>Edit Products</h3>
            <p>
              Update your existing product information
              whenever you need.
            </p>
          </div>


          <div className="feature-card">
            <h3>Manage Products</h3>
            <p>
              View all your products and remove products
              you no longer need.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;