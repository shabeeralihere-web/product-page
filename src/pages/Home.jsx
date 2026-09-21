import React from "react";
import { Link } from "react-router-dom";

function Home() {

  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const firstName = localStorage.getItem("firstName");

  // ============================================================
  // LOGGED-IN USER HOME
  // ============================================================

  if (accessToken && role === "user") {

    return (
      <div className="home authenticated-home">

        {/* ================= WELCOME ================= */}

        <section className="welcome-section">

          <div className="welcome-content">

            <p className="section-label">
              WELCOME BACK
            </p>

            <h1>
              Hello{firstName ? `, ${firstName}` : ""} 👋
            </h1>

            <p>
              Discover products, manage your cart and enjoy
              a simple shopping experience.
            </p>

          </div>

          <div className="welcome-action">

            <Link
              to="/products"
              className="primary-button"
            >
              Browse Products
            </Link>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="home-section">

          <div className="section-heading">

            <p className="section-label">
              QUICK ACTIONS
            </p>

            <h2>
              What would you like to do?
            </h2>

          </div>


          <div className="quick-action-grid">

            <Link
              to="/products"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                P
              </div>

              <div>

                <h3>
                  Explore Products
                </h3>

                <p>
                  Browse products and find something you like.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>


            <Link
              to="/cart"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                C
              </div>

              <div>

                <h3>
                  View Your Cart
                </h3>

                <p>
                  Review your selected products and continue shopping.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>


            <Link
              to="/profile"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                U
              </div>

              <div>

                <h3>
                  Your Profile
                </h3>

                <p>
                  View and manage your account information.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ================= SHOPPING SECTION ================= */}

        <section className="home-highlight-section">

          <div className="home-highlight-content">

            <p className="section-label">
              PRODUCTHUB MARKETPLACE
            </p>

            <h2>
              Find products you'll love.
            </h2>

            <p>
              Explore the available products and discover
              everything ProductHub has to offer.
            </p>

            <Link
              to="/products"
              className="primary-button"
            >
              Start Shopping →
            </Link>

          </div>

          <div className="home-highlight-visual">
            <div className="highlight-visual-card">

              <span>
                PRODUCTHUB
              </span>

              <strong>
                Explore
              </strong>

              <p>
                Discover products in one place.
              </p>

            </div>
          </div>

        </section>

      </div>
    );
  }


  // ============================================================
  // LOGGED-IN SELLER HOME
  // ============================================================

  if (accessToken && role === "seller") {

    return (
      <div className="home authenticated-home">

        {/* ================= WELCOME ================= */}

        <section className="welcome-section">

          <div className="welcome-content">

            <p className="section-label">
              SELLER CENTER
            </p>

            <h1>
              Welcome{firstName ? `, ${firstName}` : ""} 👋
            </h1>

            <p>
              Manage your products, explore the marketplace
              and grow your store from one place.
            </p>

          </div>

          <div className="welcome-action">

            <Link
              to="/my-products"
              className="primary-button"
            >
              My Products
            </Link>

          </div>

        </section>


        {/* ================= STORE ACTIONS ================= */}

        <section className="home-section">

          <div className="section-heading">

            <p className="section-label">
              STORE MANAGEMENT
            </p>

            <h2>
              Manage your store
            </h2>

            <p>
              Everything you need to manage your products
              is available here.
            </p>

          </div>


          <div className="quick-action-grid">

            <Link
              to="/my-products"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                M
              </div>

              <div>

                <h3>
                  My Products
                </h3>

                <p>
                  View, edit and manage the products you own.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>


            <Link
              to="/add-product"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                +
              </div>

              <div>

                <h3>
                  Add Product
                </h3>

                <p>
                  Add a new product to your store.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>


            <Link
              to="/products"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                P
              </div>

              <div>

                <h3>
                  All Products
                </h3>

                <p>
                  Browse the ProductHub marketplace.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ================= SELLER HIGHLIGHT ================= */}

        <section className="home-highlight-section">

          <div className="home-highlight-content">

            <p className="section-label">
              YOUR STORE
            </p>

            <h2>
              Keep your products organized.
            </h2>

            <p>
              Manage your product information from one
              convenient place and keep your store up to date.
            </p>

            <Link
              to="/my-products"
              className="primary-button"
            >
              Manage My Products →
            </Link>

          </div>

          <div className="home-highlight-visual">
            <div className="highlight-visual-card">

              <span>
                SELLER
              </span>

              <strong>
                Manage
              </strong>

              <p>
                Your products. Your store.
              </p>

            </div>
          </div>

        </section>

      </div>
    );
  }


  // ============================================================
  // LOGGED-IN ADMIN HOME
  // ============================================================

  if (accessToken && role === "admin") {

    return (
      <div className="home authenticated-home">

        {/* ================= WELCOME ================= */}

        <section className="welcome-section">

          <div className="welcome-content">

            <p className="section-label">
              ADMIN CENTER
            </p>

            <h1>
              Welcome{firstName ? `, ${firstName}` : ""} 👋
            </h1>

            <p>
              Manage users, sellers and products across
              the ProductHub platform.
            </p>

          </div>

          <div className="welcome-action">

            <Link
              to="/admin-dashboard"
              className="primary-button"
            >
              Open Dashboard
            </Link>

          </div>

        </section>


        {/* ================= ADMIN ACTIONS ================= */}

        <section className="home-section">

          <div className="section-heading">

            <p className="section-label">
              PLATFORM MANAGEMENT
            </p>

            <h2>
              Manage ProductHub
            </h2>

            <p>
              Access the main tools for managing the platform.
            </p>

          </div>


          <div className="quick-action-grid">

            <Link
              to="/admin-dashboard"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                D
              </div>

              <div>

                <h3>
                  Admin Dashboard
                </h3>

                <p>
                  View users, sellers and product information.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>


            <Link
              to="/products"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                P
              </div>

              <div>

                <h3>
                  Products
                </h3>

                <p>
                  View the products available on the platform.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>


            <Link
              to="/add-product"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                +
              </div>

              <div>

                <h3>
                  Add Product
                </h3>

                <p>
                  Add a product to the ProductHub platform.
                </p>

              </div>

              <span className="quick-action-arrow">
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ================= ADMIN HIGHLIGHT ================= */}

        <section className="home-highlight-section">

          <div className="home-highlight-content">

            <p className="section-label">
              PLATFORM OVERVIEW
            </p>

            <h2>
              Keep ProductHub organized.
            </h2>

            <p>
              Use the admin dashboard to monitor accounts
              and products from one central location.
            </p>

            <Link
              to="/admin-dashboard"
              className="primary-button"
            >
              Go to Dashboard →
            </Link>

          </div>

          <div className="home-highlight-visual">
            <div className="highlight-visual-card">

              <span>
                ADMIN
              </span>

              <strong>
                Control
              </strong>

              <p>
                Manage the platform from one place.
              </p>

            </div>
          </div>

        </section>

      </div>
    );
  }


  // ============================================================
  // PUBLIC HOME
  // ============================================================

  return (
    <div className="home">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-badge">
            PRODUCTHUB PLATFORM
          </div>

          <h1>
            Discover products.
            <br />
            <span>Manage your business.</span>
          </h1>

          <p className="hero-description">
            ProductHub brings products, shopping and seller
            management together in one simple platform.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="primary-button"
            >
              Explore Products
            </Link>

            <Link
              to="/signup"
              className="secondary-button"
            >
              Create Account
            </Link>

          </div>

          <div className="hero-note">

            <span>✓</span>

            Built for shoppers, sellers and administrators

          </div>

        </div>


        {/* ================= HERO VISUAL ================= */}

        <div className="hero-visual">

          <div className="hero-main-card">

            <div className="hero-card-top">

              <span className="hero-card-label">
                ProductHub
              </span>

              <span className="hero-card-status">
                ● Live
              </span>

            </div>


            <div className="hero-product-preview">

              <div className="preview-image">
                <span>
                  PRODUCT
                </span>
              </div>


              <div className="preview-info">

                <p>
                  Featured Product
                </p>

                <h3>
                  Modern shopping experience
                </h3>


                <div className="preview-bottom">

                  <strong>
                    ₹2,499
                  </strong>

                  <button>
                    View
                  </button>

                </div>

              </div>

            </div>

          </div>


          <div className="floating-card floating-card-one">

            <span className="floating-icon">
              ✓
            </span>

            <div>

              <strong>
                Easy shopping
              </strong>

              <p>
                Simple & organized
              </p>

            </div>

          </div>


          <div className="floating-card floating-card-two">

            <span className="floating-icon">
              ↗
            </span>

            <div>

              <strong>
                For sellers
              </strong>

              <p>
                Manage products easily
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= PLATFORM FLOW ================= */}

      <section className="platform-stats">

        <div className="stat-item">
          <strong>01</strong>
          <span>Discover</span>
        </div>

        <div className="stat-item">
          <strong>02</strong>
          <span>Manage</span>
        </div>

        <div className="stat-item">
          <strong>03</strong>
          <span>Shop</span>
        </div>

        <div className="stat-item">
          <strong>04</strong>
          <span>Grow</span>
        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="home-section">

        <div className="section-heading">

          <p className="section-label">
            EVERYTHING IN ONE PLACE
          </p>

          <h2>
            A better way to manage products
          </h2>

          <p>
            ProductHub is designed around the complete product
            experience — from discovering products to managing them.
          </p>

        </div>


        <div className="platform-features">

          <div className="platform-feature-card">

            <div className="feature-number">
              01
            </div>

            <h3>
              Explore Products
            </h3>

            <p>
              Browse products in a clean and organized
              interface and quickly find what you need.
            </p>

            <Link to="/products">
              Browse products →
            </Link>

          </div>


          <div className="platform-feature-card">

            <div className="feature-number">
              02
            </div>

            <h3>
              Sell & Manage
            </h3>

            <p>
              Sellers can manage their products and keep
              their product information organized.
            </p>

            <Link to="/signup">
              Start selling →
            </Link>

          </div>


          <div className="platform-feature-card">

            <div className="feature-number">
              03
            </div>

            <h3>
              Shop with Ease
            </h3>

            <p>
              Users can add products to their cart and
              manage their shopping experience easily.
            </p>

            <Link to="/products">
              Start shopping →
            </Link>

          </div>

        </div>

      </section>


      {/* ================= USER TYPES ================= */}

      <section className="roles-section">

        <div className="section-heading">

          <p className="section-label">
            ONE PLATFORM
          </p>

          <h2>
            Built for every role
          </h2>

          <p>
            Different users get the tools they need without
            unnecessary complexity.
          </p>

        </div>


        <div className="role-cards">

          <div className="role-card">

            <span className="role-icon">
              U
            </span>

            <div>

              <h3>
                User
              </h3>

              <p>
                Discover products, add items to your cart
                and manage your shopping experience.
              </p>

            </div>

          </div>


          <div className="role-card">

            <span className="role-icon">
              S
            </span>

            <div>

              <h3>
                Seller
              </h3>

              <p>
                Add and manage products while keeping your
                store organized.
              </p>

            </div>

          </div>


          <div className="role-card">

            <span className="role-icon">
              A
            </span>

            <div>

              <h3>
                Admin
              </h3>

              <p>
                Manage the platform and maintain control
                over the product ecosystem.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div>

          <p className="section-label">
            GET STARTED
          </p>

          <h2>
            Ready to explore ProductHub?
          </h2>

          <p>
            Create your account and start exploring the platform.
          </p>

        </div>


        <Link
          to="/signup"
          className="cta-button"
        >
          Get Started →
        </Link>

      </section>

    </div>
  );
}

export default Home;