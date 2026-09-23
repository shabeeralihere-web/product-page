import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Unauthorized.css";

function Unauthorized() {
  return (
    <main className="unauthorized-page">
      <div className="unauthorized-card">
        <span className="unauthorized-code">403</span>

        <h1>You Are Not Authorized</h1>

        <p>
          You don't have permission to access this page.
        </p>

        <Link to="/" className="unauthorized-button">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default Unauthorized;