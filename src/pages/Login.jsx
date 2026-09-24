
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../api";
import { useAuth } from "../Context/AuthContext";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
      general: "",
    });
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      return "Please enter a valid email";
    }

    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError) {
      newErrors.email = emailError;
    }

    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors({
      email: newErrors.email || "",
      password: newErrors.password || "",
      general: "",
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      const loginData = {
        accessToken: response.data.accessToken,
        role: response.data.data.role,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
      };

      login(loginData);

      toast.success("Login successful! 👋");

      const role = response.data.data.role;

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/products");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid email or password";

      setErrors({
        email: "",
        password: "",
        general: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-page__background-glow login-page__background-glow--one" />
      <div className="login-page__background-glow login-page__background-glow--two" />

      <div className="login-container">
        <section className="login-brand">
          <div className="login-brand__content">
            <Link to="/" className="login-brand__logo">
              <span className="login-brand__logo-mark">P</span>

              <span>
                Product<span>Hub</span>
              </span>
            </Link>

            <div className="login-brand__text">
              <span className="login-brand__eyebrow">
                PRODUCT PLATFORM
              </span>

              <h1>
                Everything you need,
                <br />
                <span>in one place.</span>
              </h1>

              <p>
                Discover products, manage your store, and enjoy a simple
                shopping experience built around you.
              </p>
            </div>

            <div className="login-brand__points">
              <div className="login-brand__point">
                <span className="login-brand__point-icon">
                  <FaCheck />
                </span>
                <span>Simple product discovery</span>
              </div>

              <div className="login-brand__point">
                <span className="login-brand__point-icon">
                  <FaCheck />
                </span>
                <span>Seller-friendly management</span>
              </div>

              <div className="login-brand__point">
                <span className="login-brand__point-icon">
                  <FaCheck />
                </span>
                <span>Secure account access</span>
              </div>
            </div>
          </div>
        </section>

        <section className="login-form-section">
          <div className="login-form-card">
            <div className="login-form-header">
              <div className="login-form-header__icon">
                <FaUser />
              </div>

              <span className="login-form-header__eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in to ProductHub</h2>

              <p>Enter your details to continue.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="email">Email address</label>

                <div
                  className={`login-input-wrapper ${
                    errors.email ? "login-input-wrapper--error" : ""
                  }`}
                >
                  <FaUser className="login-input-icon" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                {errors.email && (
                  <p className="login-field-error">{errors.email}</p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="password">Password</label>

                <div
                  className={`login-input-wrapper ${
                    errors.password ? "login-input-wrapper--error" : ""
                  }`}
                >
                  <FaLock className="login-input-icon" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="login-field-error">{errors.password}</p>
                )}
              </div>

              {errors.general && (
                <div className="login-general-error">
                  <span>!</span>
                  <p>{errors.general}</p>
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="login-submit__spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="login-signup">
              <span>Don't have an account?</span>

              <Link to="/signup">
                Create one
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;

