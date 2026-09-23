import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>

        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link to="/" className="not-found-button">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;