import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api from "../api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // ============================================
  // AUTH
  // ============================================

  const { accessToken } = useAuth();


  // ============================================
  // CART ITEMS
  // ============================================

  // Products currently loaded on the current page
  const [cartItems, setCartItems] = useState([]);

  // Total number of products in the cart
  // Used by Navbar
  const [cartCount, setCartCount] = useState(0);


  // ============================================
  // GET CART
  // ============================================

  const getCart = useCallback(async (page = 1) => {

    try {

      // --------------------------------------------
      // If user is not logged in
      // --------------------------------------------

      if (!accessToken) {

        setCartItems([]);

        setCartCount(0);

        return null;
      }


      // --------------------------------------------
      // Get cart from backend
      // --------------------------------------------

      const response = await api.get(
        `http://localhost:8000/api/cart/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      console.log(
        "CART RESPONSE:",
        response.data
      );


      // --------------------------------------------
      // Store current page products
      // --------------------------------------------

      setCartItems(
        response.data.data
      );


      // --------------------------------------------
      // Store total cart count
      // --------------------------------------------

      setCartCount(
        response.data.pagination?.totalItems || 0
      );


      // --------------------------------------------
      // Return pagination information
      // to Cart.jsx
      // --------------------------------------------

      return response.data.pagination;


    } catch (error) {

      console.log(
        "GET CART ERROR:",
        error
      );


      setCartItems([]);

      setCartCount(0);

      return null;
    }

  }, [accessToken]);


  // ============================================
  // UPDATE CART QUANTITY
  // ============================================

  const updateCartQuantity = async (
    cartId,
    newQuantity
  ) => {

    if (newQuantity < 1) {
      return;
    }


    try {

      await api.put(
        "http://localhost:8000/api/cart/update",

        {
          cartId: cartId,
          quantity: newQuantity,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      // --------------------------------------------
      // Update frontend immediately
      // --------------------------------------------

      setCartItems(
        (previousItems) =>
          previousItems.map(
            (item) =>
              item._id === cartId
                ? {
                    ...item,
                    quantity: newQuantity,
                  }
                : item
          )
      );


    } catch (error) {

      console.log(
        "UPDATE CART ERROR:",
        error
      );

    }
  };


  // ============================================
  // REMOVE CART ITEM
  // ============================================

  const removeCartItem = async (
    cartId
  ) => {

    try {

      await api.delete(
        "http://localhost:8000/api/cart/remove",

        {
          data: {
            cartId: cartId,
          },

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      // --------------------------------------------
      // Remove from current page
      // --------------------------------------------

      setCartItems(
        (previousItems) =>
          previousItems.filter(
            (item) =>
              item._id !== cartId
          )
      );


      // --------------------------------------------
      // Decrease Navbar count
      // --------------------------------------------

      setCartCount(
        (previousCount) =>
          Math.max(
            previousCount - 1,
            0
          )
      );


    } catch (error) {

      console.log(
        "REMOVE CART ERROR:",
        error
      );

    }
  };


  // ============================================
  // CLEAR CART
  // ============================================

  const clearCart = async () => {

    try {

      await api.delete(
        "http://localhost:8000/api/cart/clear",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      // --------------------------------------------
      // Clear frontend cart
      // --------------------------------------------

      setCartItems([]);

      // Reset Navbar count
      setCartCount(0);


    } catch (error) {

      console.log(
        "CLEAR CART ERROR:",
        error
      );

    }
  };


  // ============================================
  // LOAD CART WHEN LOGIN STATE CHANGES
  // ============================================

  useEffect(() => {

    if (accessToken) {

      // User logged in
      // Load their existing cart

      getCart();

    } else {

      // User logged out
      // Clear cart information

      setCartItems([]);

      setCartCount(0);

    }

  }, [accessToken, getCart]);


  // ============================================
  // CONTEXT PROVIDER
  // ============================================

  return (

    <CartContext.Provider
      value={{

        // Current page cart items
        cartItems,

        // Total cart item count
        cartCount,

        // State setters
        setCartItems,
        setCartCount,

        // Cart functions
        getCart,
        updateCartQuantity,
        removeCartItem,
        clearCart,

      }}
    >

      {children}

    </CartContext.Provider>

  );
};


export default CartContext;