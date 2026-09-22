import React from "react";
import ReactDOM from "react-dom/client";

import "./Styles/variables.css";
import "./Styles/global.css";
import "./Styles/animations.css";
import "./Styles/responsive.css";
import App from "./App";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);