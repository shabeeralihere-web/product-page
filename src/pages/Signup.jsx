import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
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

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    minLength:
      formData.password.length >= 6,

    uppercase:
      /[A-Z]/.test(formData.password),

    lowercase:
      /[a-z]/.test(formData.password),

    number:
      /[0-9]/.test(formData.password),

    special:
      /[^A-Za-z0-9]/.test(formData.password)

  };


  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special &&
    formData.confirmPassword !== "" &&
    formData.password === formData.confirmPassword &&
    (formData.role === "user" ||
      formData.role === "seller");


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });


    if (name === "firstName") {

      setErrors({
        ...errors,
        firstName: validateFirstName(value)
      });

    }


    if (name === "lastName") {

      setErrors({
        ...errors,
        lastName: validateLastName(value)
      });

    }


    if (name === "email") {

      setErrors({
        ...errors,
        email: validateEmail(value)
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
            : ""
      });

    }


    if (name === "confirmPassword") {

      setErrors({
        ...errors,
        confirmPassword:
          validateConfirmPassword(value)
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
        role: formData.role
      };


      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        userData
      );


      console.log("SIGNUP RESPONSE:", response.data);


      // Save login information

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "role",
        response.data.data.role
      );

      localStorage.setItem(
        "firstName",
        response.data.data.firstName
      );

      localStorage.setItem(
        "lastName",
        response.data.data.lastName
      );

      localStorage.setItem(
        "email",
        response.data.data.email
      );


      // Show success toast

      toast.success("Signup successful! 🎉");


      // Go to Home without reloading

      navigate("/");


    } catch (error) {

      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        "Signup failed";


      // Show error toast

      toast.error(errorMessage);

    } finally {

      setIsLoading(false);

    }

  };


  return (
    <div className="auth-page">

      <div className="auth-layout auth-layout-signup">

        {/* Brand side */}

        <div className="auth-brand-panel">

          <div className="auth-brand-content">

            <div className="auth-brand-logo">
              ProductHub
            </div>

            <p className="auth-brand-label">
              JOIN THE PLATFORM
            </p>

            <h1>
              Start your
              <br />
              ProductHub journey.
            </h1>

            <p>
              Create an account to discover products,
              manage your store and enjoy a connected
              shopping experience.
            </p>

            <div className="auth-points">

              <span>✓ Create your personal account</span>

              <span>✓ Choose User or Seller</span>

              <span>✓ Start using ProductHub</span>

            </div>

          </div>

        </div>


        {/* Form */}

        <div className="auth-form-section">

          <div className="auth-form-container signup-form-container">

            <div className="auth-header">

              <p className="section-label">
                CREATE ACCOUNT
              </p>

              <h2>
                Get started with ProductHub
              </h2>

              <p>
                Fill in your details to create your account.
              </p>

            </div>


            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* Name */}

              <div className="name-fields">

                <div className="auth-form-group">

                  <label>
                    First name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  {errors.firstName && (
                    <p className="field-error">
                      {errors.firstName}
                    </p>
                  )}

                </div>


                <div className="auth-form-group">

                  <label>
                    Last name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />

                  {errors.lastName && (
                    <p className="field-error">
                      {errors.lastName}
                    </p>
                  )}

                </div>

              </div>


              {/* Email */}

              <div className="auth-form-group">

                <label>
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="field-error">
                    {errors.email}
                  </p>
                )}

              </div>


              {/* Password */}

              <div className="auth-form-group">

                <label>
                  Password
                </label>

                <div className="password-input-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>


                {formData.password && (

                  <div className="password-rules">

                    <p className={
                      passwordRules.minLength
                        ? "rule-valid"
                        : "rule-invalid"
                    }>
                      {passwordRules.minLength ? "✓" : "○"}
                      {" "}At least 6 characters
                    </p>

                    <p className={
                      passwordRules.uppercase
                        ? "rule-valid"
                        : "rule-invalid"
                    }>
                      {passwordRules.uppercase ? "✓" : "○"}
                      {" "}One uppercase letter
                    </p>

                    <p className={
                      passwordRules.lowercase
                        ? "rule-valid"
                        : "rule-invalid"
                    }>
                      {passwordRules.lowercase ? "✓" : "○"}
                      {" "}One lowercase letter
                    </p>

                    <p className={
                      passwordRules.number
                        ? "rule-valid"
                        : "rule-invalid"
                    }>
                      {passwordRules.number ? "✓" : "○"}
                      {" "}One number
                    </p>

                    <p className={
                      passwordRules.special
                        ? "rule-valid"
                        : "rule-invalid"
                    }>
                      {passwordRules.special ? "✓" : "○"}
                      {" "}One special character
                    </p>

                  </div>

                )}

                {errors.password && (
                  <p className="field-error">
                    {errors.password}
                  </p>
                )}

              </div>


              {/* Confirm Password */}

              <div className="auth-form-group">

                <label>
                  Confirm password
                </label>

                <div className="password-input-wrapper">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {formData.confirmPassword && (
                  <p
                    className={
                      errors.confirmPassword
                        ? "field-error"
                        : "field-success"
                    }
                  >
                    {errors.confirmPassword ||
                      "Passwords match"}
                  </p>
                )}

              </div>


              {/* Role */}

              <div className="auth-form-group">

                <label>
                  Account type
                </label>

                <div className="role-selection">

                  <label
                    className={
                      formData.role === "user"
                        ? "role-option active"
                        : "role-option"
                    }
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

                    <span className="role-option-content">

                      <strong>
                        User
                      </strong>

                      <small>
                        Browse & shop products
                      </small>

                    </span>

                  </label>


                  <label
                    className={
                      formData.role === "seller"
                        ? "role-option active"
                        : "role-option"
                    }
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

                    <span className="role-option-content">

                      <strong>
                        Seller
                      </strong>

                      <small>
                        Manage your products
                      </small>

                    </span>

                  </label>

                </div>

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={
                  !isFormValid ||
                  isLoading
                }
              >
                {isLoading
                  ? "Creating account..."
                  : "Create account"}
              </button>

            </form>


            <p className="auth-switch">

              Already have an account?

              {" "}

              <a href="/login">
                Sign in
              </a>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;