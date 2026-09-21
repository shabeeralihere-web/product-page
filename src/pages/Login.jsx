import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );

      console.log("LOGIN RESPONSE:", response.data);
      console.log("ROLE:", response.data.data.role);


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

      toast.success("Login successful! 👋");


      // Go to Home without reloading the application

      navigate("/");

    } catch (error) {

      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        "Invalid email or password";


      // Show error inside form

      setError(errorMessage);


      // Show error toast

      toast.error(errorMessage);

    } finally {

      setIsLoading(false);

    }

  };


  return (
    <div className="auth-page">

      <div className="auth-layout">

        {/* Left side */}

        <div className="auth-brand-panel">

          <div className="auth-brand-content">

            <div className="auth-brand-logo">
              ProductHub
            </div>

            <p className="auth-brand-label">
              PRODUCT PLATFORM
            </p>

            <h1>
              Everything you need,
              <br />
              in one place.
            </h1>

            <p>
              Discover products, manage your store and
              enjoy a simple shopping experience.
            </p>

            <div className="auth-points">

              <span>
                ✓ Simple product discovery
              </span>

              <span>
                ✓ Seller-friendly management
              </span>

              <span>
                ✓ Secure account access
              </span>

            </div>

          </div>

        </div>


        {/* Right side */}

        <div className="auth-form-section">

          <div className="auth-form-container">

            <div className="auth-header">

              <p className="section-label">
                WELCOME BACK
              </p>

              <h2>
                Sign in to ProductHub
              </h2>

              <p>
                Enter your details to continue.
              </p>

            </div>


            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

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
                  required
                />

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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* Error */}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}


              {/* Submit */}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={isLoading}
              >
                {isLoading
                  ? "Signing in..."
                  : "Sign in"}
              </button>

            </form>


            <p className="auth-switch">

              Don't have an account?

              {" "}

              <a href="/signup">
                Create one
              </a>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;