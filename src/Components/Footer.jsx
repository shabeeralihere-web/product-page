import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "../Styles/Footer.css";

function Footer() {
  const { accessToken, role } = useAuth();

  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__main">

          <div className="footer__brand">
            <Link to="/" className="footer__brand-link">
              <img
                src="/ProductHub.png"
                alt="ProductHub"
                className="footer__logo"
              />

              <span className="footer__brand-name">
                Product<span>Hub</span>
              </span>
            </Link>

            <p className="footer__description">
              Discover products, manage your store and shop with ease.
            </p>

            <div className="footer__socials">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h4>Platform</h4>

            <Link to="/">
              Home
            </Link>

            <Link to="/products">
              Products
            </Link>
          </div>

          <div className="footer__column">
            <h4>Account</h4>

            {accessToken ? (
              <>
                <Link to="/profile">
                  Profile
                </Link>

                <Link to="/cart">
                  Cart
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  Login
                </Link>

                <Link to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>

          {accessToken && (role === "seller" || role === "admin") && (
            <div className="footer__column">
              <h4>
                {role === "seller" ? "Seller" : "Management"}
              </h4>

              {role === "seller" && (
                <Link to="/seller-dashboard">
                  Dashboard
                </Link>
              )}

              {role === "admin" && (
                <Link to="/admin-dashboard">
                  Dashboard
                </Link>
              )}

              <Link to="/add-product">
                Add Product
              </Link>
            </div>
          )}

        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p>
            © 2026 ProductHub. All rights reserved.
          </p>

          <p>
            Built with MERN Stack
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;