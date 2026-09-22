import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBoxOpen,
  FaShoppingCart,
  FaStore,
  FaMobileAlt,
  FaLaptop,
  FaTshirt,
  FaHome,
  FaHeadphones,
  FaUser,
  FaShieldAlt,
  
} from "react-icons/fa";
import "../Styles/Home.css";

function Home() {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      ".home-reveal, .home-reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const getPrimaryAction = () => {
    if (accessToken && role === "seller") {
      return {
        text: "Seller Dashboard",
        path: "/seller-dashboard",
      };
    }

    if (accessToken && role === "admin") {
      return {
        text: "Admin Dashboard",
        path: "/admin-dashboard",
      };
    }

    if (accessToken) {
      return {
        text: "Explore Products",
        path: "/products",
      };
    }

    return {
      text: "Explore Products",
      path: "/products",
    };
  };

  const primaryAction = getPrimaryAction();

  return (
    <main className="home-page">

      {accessToken && firstName && (
        <div className="home-welcome">
          <div className="home-container">
            <span>
              Welcome back, <strong>{firstName}</strong>
            </span>

            <Link to="/profile">
              View Profile <FaArrowRight />
            </Link>
          </div>
        </div>
      )}

      <section className="home-hero">
        <div className="home-hero__background-glow home-hero__background-glow--one" />
        <div className="home-hero__background-glow home-hero__background-glow--two" />

        <div className="home-container home-hero__container">

          <div className="home-hero__content home-reveal">
            <span className="home-hero__eyebrow">
              PRODUCTHUB MARKETPLACE
            </span>

            <h1>
              Everything you need,
              <span> in one place.</span>
            </h1>

            <p>
              Discover products, shop with ease and manage your store
              through one simple marketplace built for modern shopping.
            </p>

            <div className="home-hero__actions">
              <Link
                to={primaryAction.path}
                className="home-button home-button--primary"
              >
                {primaryAction.text}
                <FaArrowRight />
              </Link>

              {!accessToken && (
                <Link
                  to="/signup"
                  className="home-button home-button--secondary"
                >
                  Create Account
                </Link>
              )}

              {accessToken && role === "user" && (
                <Link
                  to="/cart"
                  className="home-button home-button--secondary"
                >
                  View Cart
                </Link>
              )}

              {accessToken && role === "seller" && (
                <Link
                  to="/add-product"
                  className="home-button home-button--secondary"
                >
                  Add Product
                </Link>
              )}

              {accessToken && role === "admin" && (
                <Link
                  to="/add-product"
                  className="home-button home-button--secondary"
                >
                  Add Product
                </Link>
              )}
            </div>

            <div className="home-hero__trust">
              <span>
                <FaShieldAlt />
                Simple
              </span>

              <span>
                <FaBoxOpen />
                Organized
              </span>

              <span>
                <FaShoppingCart />
                Easy to shop
              </span>
            </div>
          </div>

          <div className="home-hero__visual home-reveal-scale">

            <div className="home-hero__glow" />

            <div className="home-product-preview">

              <div className="home-product-preview__top">
                <div>
                  <span>PRODUCTHUB</span>
                  <strong>Featured collection</strong>
                </div>

                <div className="home-product-preview__status">
                  <span />
                  Live
                </div>
              </div>

              <div className="home-product-preview__image">
                <div className="home-product-preview__image-inner">
                  <FaBoxOpen />
                  <span>EXPLORE</span>
                </div>
              </div>

              <div className="home-product-preview__bottom">
                <div>
                  <span>Discover something new</span>
                  <strong>Products for everyday life</strong>
                </div>

                <Link to="/products">
                  <FaArrowRight />
                </Link>
              </div>

            </div>

            <div className="home-floating-card home-floating-card--top">
              <div className="home-floating-card__icon">
                <FaShoppingCart />
              </div>

              <div>
                <strong>Easy shopping</strong>
                <span>Browse & add to cart</span>
              </div>
            </div>

            <div className="home-floating-card home-floating-card--bottom">
              <div className="home-floating-card__icon">
                <FaStore />
              </div>

              <div>
                <strong>For sellers</strong>
                <span>Manage your products</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="home-marquee-section">
        <div className="home-marquee">
          <div className="home-marquee__track">

            <span>DISCOVER PRODUCTS</span>
            <i>✦</i>
            <span>SHOP WITH EASE</span>
            <i>✦</i>
            <span>MANAGE YOUR STORE</span>
            <i>✦</i>
            <span>PRODUCTHUB MARKETPLACE</span>
            <i>✦</i>

            <span>DISCOVER PRODUCTS</span>
            <i>✦</i>
            <span>SHOP WITH EASE</span>
            <i>✦</i>
            <span>MANAGE YOUR STORE</span>
            <i>✦</i>
            <span>PRODUCTHUB MARKETPLACE</span>
            <i>✦</i>

          </div>
        </div>
      </section>

      <section className="home-section home-categories">
        <div className="home-container">

          <div className="home-section-header home-reveal">
            <span>EXPLORE</span>

            <h2>Shop by category</h2>

            <p>
              Explore different types of products and find what fits your
              needs.
            </p>
          </div>

          <div className="home-category-grid">

            <Link
              to="/products"
              className="home-category-card home-reveal"
            >
              <div className="home-category-card__icon">
                <FaMobileAlt />
              </div>

              <div>
                <span>01</span>
                <h3>Mobiles</h3>
                <p>Smartphones & devices</p>
              </div>

              <FaArrowRight className="home-category-card__arrow" />
            </Link>

            <Link
              to="/products"
              className="home-category-card home-reveal"
            >
              <div className="home-category-card__icon">
                <FaLaptop />
              </div>

              <div>
                <span>02</span>
                <h3>Electronics</h3>
                <p>Tech for everyday life</p>
              </div>

              <FaArrowRight className="home-category-card__arrow" />
            </Link>

            <Link
              to="/products"
              className="home-category-card home-reveal"
            >
              <div className="home-category-card__icon">
                <FaTshirt />
              </div>

              <div>
                <span>03</span>
                <h3>Fashion</h3>
                <p>Style & essentials</p>
              </div>

              <FaArrowRight className="home-category-card__arrow" />
            </Link>

            <Link
              to="/products"
              className="home-category-card home-reveal"
            >
              <div className="home-category-card__icon">
                <FaHome />
              </div>

              <div>
                <span>04</span>
                <h3>Home</h3>
                <p>Things for your space</p>
              </div>

              <FaArrowRight className="home-category-card__arrow" />
            </Link>

            <Link
              to="/products"
              className="home-category-card home-reveal"
            >
              <div className="home-category-card__icon">
                <FaHeadphones />
              </div>

              <div>
                <span>05</span>
                <h3>Accessories</h3>
                <p>Useful everyday products</p>
              </div>

              <FaArrowRight className="home-category-card__arrow" />
            </Link>

          </div>
        </div>
      </section>

      <section className="home-section home-features">
        <div className="home-container">

          <div className="home-section-header home-reveal">
            <span>WHY PRODUCTHUB</span>

            <h2>Simple by design.</h2>

            <p>
              ProductHub keeps the shopping and product management experience
              focused, organized and easy to use.
            </p>
          </div>

          <div className="home-feature-grid">

            <article className="home-feature-card home-reveal">
              <div className="home-feature-card__number">
                01
              </div>

              <div className="home-feature-card__icon">
                <FaBoxOpen />
              </div>

              <h3>Discover products</h3>

              <p>
                Browse products through a clean marketplace and quickly find
                what you are looking for.
              </p>

              <Link to="/products">
                Explore products
                <FaArrowRight />
              </Link>
            </article>

            <article className="home-feature-card home-reveal">
              <div className="home-feature-card__number">
                02
              </div>

              <div className="home-feature-card__icon">
                <FaShoppingCart />
              </div>

              <h3>Shop with ease</h3>

              <p>
                Add products to your cart and manage your shopping experience
                from one convenient place.
              </p>

              <Link to="/products">
                Start shopping
                <FaArrowRight />
              </Link>
            </article>

            <article className="home-feature-card home-reveal">
              <div className="home-feature-card__number">
                03
              </div>

              <div className="home-feature-card__icon">
                <FaStore />
              </div>

              <h3>Manage your store</h3>

              <p>
                Sellers can add and manage products while keeping their store
                organized.
              </p>

              <Link to="/signup">
                Start selling
                <FaArrowRight />
              </Link>
            </article>

          </div>
        </div>
      </section>

      <section className="home-section home-process">
        <div className="home-container">

          <div className="home-process__layout">

            <div className="home-process__intro home-reveal">
              <span>HOW IT WORKS</span>

              <h2>
                From discovery
                <span> to checkout.</span>
              </h2>

              <p>
                ProductHub keeps every important step simple, whether you are
                shopping for something new or managing products as a seller.
              </p>

              <Link
                to="/products"
                className="home-text-link"
              >
                Explore marketplace
                <FaArrowRight />
              </Link>
            </div>

            <div className="home-process__steps">

              <div className="home-process-step home-reveal">
                <span className="home-process-step__number">
                  01
                </span>

                <div>
                  <h3>Explore</h3>

                  <p>
                    Browse the available products and discover something
                    useful.
                  </p>
                </div>
              </div>

              <div className="home-process-step home-reveal">
                <span className="home-process-step__number">
                  02
                </span>

                <div>
                  <h3>Choose</h3>

                  <p>
                    Open a product, check its details and decide what you want.
                  </p>
                </div>
              </div>

              <div className="home-process-step home-reveal">
                <span className="home-process-step__number">
                  03
                </span>

                <div>
                  <h3>Shop</h3>

                  <p>
                    Add products to your cart and continue with your shopping.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="home-section home-roles">
        <div className="home-container">

          <div className="home-section-header home-reveal">
            <span>ONE PLATFORM</span>

            <h2>Built around your role.</h2>

            <p>
              ProductHub provides different tools depending on how you use
              the platform.
            </p>
          </div>

          <div className="home-role-grid">

            <article className="home-role-card home-reveal">
              <div className="home-role-card__top">
                <div className="home-role-card__icon">
                  <FaUser />
                </div>

                <span>USER</span>
              </div>

              <h3>Shop simply.</h3>

              <p>
                Discover products, manage your cart and keep your shopping
                experience organized.
              </p>

              <Link to="/products">
                Browse products
                <FaArrowRight />
              </Link>
            </article>

            <article className="home-role-card home-role-card--featured home-reveal">
              <div className="home-role-card__top">
                <div className="home-role-card__icon">
                  <FaStore />
                </div>

                <span>SELLER</span>
              </div>

              <h3>Build your store.</h3>

              <p>
                Add products, manage your listings and keep your marketplace
                presence organized.
              </p>

              <Link to="/signup">
                Become a seller
                <FaArrowRight />
              </Link>
            </article>

            <article className="home-role-card home-reveal">
              <div className="home-role-card__top">
                <div className="home-role-card__icon">
                  <FaShieldAlt />
                </div>

                <span>ADMIN</span>
              </div>

              <h3>Manage the platform.</h3>

              <p>
                Manage products and platform activity through the administration
                tools.
              </p>

              <Link to="/login">
                Admin login
                <FaArrowRight />
              </Link>
            </article>

          </div>

        </div>
      </section>

      <section className="home-marquee-section home-marquee-section--secondary">
        <div className="home-marquee">
          <div className="home-marquee__track home-marquee__track--reverse">

            <span>PRODUCTS</span>
            <i>✦</i>
            <span>SHOPPING</span>
            <i>✦</i>
            <span>SELLING</span>
            <i>✦</i>
            <span>PRODUCTHUB</span>
            <i>✦</i>

            <span>PRODUCTS</span>
            <i>✦</i>
            <span>SHOPPING</span>
            <i>✦</i>
            <span>SELLING</span>
            <i>✦</i>
            <span>PRODUCTHUB</span>
            <i>✦</i>

          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="home-container">

          <div className="home-cta home-reveal">

            <div className="home-cta__content">
              <span>GET STARTED</span>

              <h2>
                Ready to explore
                <span> ProductHub?</span>
              </h2>

              <p>
                Find products, start shopping or create your store today.
              </p>
            </div>

            <div className="home-cta__actions">
              <Link
                to="/products"
                className="home-button home-button--primary"
              >
                Explore Products
                <FaArrowRight />
              </Link>

              {!accessToken && (
                <Link
                  to="/signup"
                  className="home-button home-button--secondary"
                >
                  Create Account
                </Link>
              )}
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;