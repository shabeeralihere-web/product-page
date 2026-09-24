import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaStore,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../api";
import { useAuth } from "../Context/AuthContext";

import "../Styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const validateFirstName = (value) => {
    if (!value.trim()) {
      return "First name is required";
    }

    return "";
  };

  const validateLastName = (value) => {
    if (!value.trim()) {
      return "Last name is required";
    }

    return "";
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
    if (!value) {
      return "Password is required";
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter";
    }

    if (!/[0-9]/.test(value)) {
      return "Password must contain a number";
    }

    if (!/[^A-Za-z0-9]/.test(value)) {
      return "Password must contain a special character";
    }

    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      return "Please confirm your password";
    }

    if (value !== formData.password) {
      return "Passwords do not match";
    }

    return "";
  };

  const passwordRules = {
    minLength: formData.password.length >= 6,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "firstName") {
      setErrors({
        ...errors,
        firstName: validateFirstName(value),
      });
    }

    if (name === "lastName") {
      setErrors({
        ...errors,
        lastName: validateLastName(value),
      });
    }

    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value),
      });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
        confirmPassword:
          formData.confirmPassword &&
          value !== formData.confirmPassword
            ? "Passwords do not match"
            : "",
      });
    }

    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword: validateConfirmPassword(value),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const firstNameError =
      validateFirstName(formData.firstName);

    const lastNameError =
      validateLastName(formData.lastName);

    const emailError =
      validateEmail(formData.email);

    const passwordError =
      validatePassword(formData.password);

    const confirmPasswordError =
      validateConfirmPassword(
        formData.confirmPassword
      );

    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }

    if (lastNameError) {
      newErrors.lastName = lastNameError;
    }

    if (emailError) {
      newErrors.email = emailError;
    }

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (confirmPasswordError) {
      newErrors.confirmPassword =
        confirmPasswordError;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await api.post(
        "/auth/register",
        userData
      );

      console.log(
        "SIGNUP RESPONSE:",
        response.data
      );

      const loginData = {
        accessToken: response.data.accessToken,
        role: response.data.data.role,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
      };

      login(loginData);

      toast.success("Signup successful! 🎉");

      const role = response.data.data.role;

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        "Signup failed";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-page__glow signup-page__glow--one" />
      <div className="signup-page__glow signup-page__glow--two" />

      <div className="signup-container">
        <section className="signup-brand">
          <div className="signup-brand__content">
            <Link
              to="/"
              className="signup-brand__logo"
            >
              <span className="signup-brand__logo-mark">
                P
              </span>

              <span>
                Product<span>Hub</span>
              </span>
            </Link>

            <div className="signup-brand__text">
              <span className="signup-brand__eyebrow">
                JOIN THE PLATFORM
              </span>

              <h1>
                Start your
                <br />
                <span>ProductHub journey.</span>
              </h1>

              <p>
                Create an account to discover products,
                manage your store, and enjoy a connected
                shopping experience.
              </p>
            </div>

            <div className="signup-brand__points">
              <div className="signup-brand__point">
                <span className="signup-brand__point-icon">
                  <FaCheck />
                </span>

                <span>
                  Create your personal account
                </span>
              </div>

              <div className="signup-brand__point">
                <span className="signup-brand__point-icon">
                  <FaCheck />
                </span>

                <span>
                  Choose User or Seller
                </span>
              </div>

              <div className="signup-brand__point">
                <span className="signup-brand__point-icon">
                  <FaCheck />
                </span>

                <span>
                  Start using ProductHub
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="signup-form-section">
          <div className="signup-form-card">
            <div className="signup-form-header">
              <div className="signup-form-header__icon">
                <FaUserPlus />
              </div>

              <span className="signup-form-header__eyebrow">
                CREATE ACCOUNT
              </span>

              <h2>
                Get started with ProductHub
              </h2>

              <p>
                Fill in your details to create your account.
              </p>
            </div>

            <form
              className="signup-form"
              onSubmit={handleSubmit}
            >
              <div className="signup-name-fields">
                <div className="signup-field">
                  <label htmlFor="firstName">
                    First name
                  </label>

                  <div
                    className={`signup-input-wrapper ${
                      errors.firstName
                        ? "signup-input-wrapper--error"
                        : ""
                    }`}
                  >
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                  </div>

                  {errors.firstName && (
                    <p className="signup-field-error">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="signup-field">
                  <label htmlFor="lastName">
                    Last name
                  </label>

                  <div
                    className={`signup-input-wrapper ${
                      errors.lastName
                        ? "signup-input-wrapper--error"
                        : ""
                    }`}
                  >
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </div>

                  {errors.lastName && (
                    <p className="signup-field-error">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="signup-field">
                <label htmlFor="signup-email">
                  Email address
                </label>

                <div
                  className={`signup-input-wrapper ${
                    errors.email
                      ? "signup-input-wrapper--error"
                      : ""
                  }`}
                >
                  <FaUser className="signup-input-icon" />

                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                {errors.email && (
                  <p className="signup-field-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="signup-field">
                <label htmlFor="signup-password">
                  Password
                </label>

                <div
                  className={`signup-input-wrapper ${
                    errors.password
                      ? "signup-input-wrapper--error"
                      : ""
                  }`}
                >
                  <input
                    id="signup-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>

                {formData.password && (
                  <div className="signup-password-rules">
                    <p
                      className={
                        passwordRules.minLength
                          ? "signup-rule--valid"
                          : "signup-rule--invalid"
                      }
                    >
                      <span>
                        {passwordRules.minLength
                          ? "✓"
                          : "○"}
                      </span>
                      At least 6 characters
                    </p>

                    <p
                      className={
                        passwordRules.uppercase
                          ? "signup-rule--valid"
                          : "signup-rule--invalid"
                      }
                    >
                      <span>
                        {passwordRules.uppercase
                          ? "✓"
                          : "○"}
                      </span>
                      One uppercase letter
                    </p>

                    <p
                      className={
                        passwordRules.lowercase
                          ? "signup-rule--valid"
                          : "signup-rule--invalid"
                      }
                    >
                      <span>
                        {passwordRules.lowercase
                          ? "✓"
                          : "○"}
                      </span>
                      One lowercase letter
                    </p>

                    <p
                      className={
                        passwordRules.number
                          ? "signup-rule--valid"
                          : "signup-rule--invalid"
                      }
                    >
                      <span>
                        {passwordRules.number
                          ? "✓"
                          : "○"}
                      </span>
                      One number
                    </p>

                    <p
                      className={
                        passwordRules.special
                          ? "signup-rule--valid"
                          : "signup-rule--invalid"
                      }
                    >
                      <span>
                        {passwordRules.special
                          ? "✓"
                          : "○"}
                      </span>
                      One special character
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="signup-field-error">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="signup-field">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div
                  className={`signup-input-wrapper ${
                    errors.confirmPassword
                      ? "signup-input-wrapper--error"
                      : ""
                  }`}
                >
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>

                {formData.confirmPassword && (
                  <p
                    className={
                      errors.confirmPassword
                        ? "signup-field-error"
                        : "signup-field-success"
                    }
                  >
                    {errors.confirmPassword ||
                      "Passwords match"}
                  </p>
                )}
              </div>

              <div className="signup-field">
                <label>
                  Account type
                </label>

                <div className="signup-role-selection">
                  <label
                    className={`signup-role-option ${
                      formData.role === "user"
                        ? "signup-role-option--active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={
                        formData.role === "user"
                      }
                      onChange={handleChange}
                    />

                    <span className="signup-role-icon">
                      <FaUser />
                    </span>

                    <span className="signup-role-content">
                      <strong>User</strong>
                      <small>
                        Browse & shop products
                      </small>
                    </span>

                    <span className="signup-role-check">
                      <FaCheck />
                    </span>
                  </label>

                  <label
                    className={`signup-role-option ${
                      formData.role === "seller"
                        ? "signup-role-option--active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={
                        formData.role === "seller"
                      }
                      onChange={handleChange}
                    />

                    <span className="signup-role-icon">
                      <FaStore />
                    </span>

                    <span className="signup-role-content">
                      <strong>Seller</strong>
                      <small>
                        Manage your products
                      </small>
                    </span>

                    <span className="signup-role-check">
                      <FaCheck />
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="signup-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="signup-submit__spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="signup-login">
              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign in
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;