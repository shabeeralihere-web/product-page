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
  const { accessToken } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getCart = useCallback(
    async (page = 1) => {
      if (!accessToken) {
        setCartItems([]);
        setCartCount(0);
        return null;
      }

      try {
        const response = await api.get(
          `http://localhost:8000/api/cart/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const responseData = response.data;

        const items = responseData.data || [];

        const totalItems =
          responseData.pagination?.totalItems ??
          items.length;

        setCartItems(items);
        setCartCount(totalItems);

        return responseData;
      } catch (error) {
        console.log("GET CART ERROR:", error);

        setCartItems([]);
        setCartCount(0);

        return null;
      }
    },
    [accessToken]
  );

  const getAllCartItems = useCallback(async () => {
    if (!accessToken) {
      return [];
    }

    try {
      const firstResponse = await api.get(
        "http://localhost:8000/api/cart/?page=1",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const firstData = firstResponse.data;

      let allItems = firstData.data || [];

      const totalPages =
        firstData.pagination?.totalPages || 1;

      for (let page = 2; page <= totalPages; page++) {
        const response = await api.get(
          `http://localhost:8000/api/cart/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const pageItems = response.data.data || [];

        allItems = [
          ...allItems,
          ...pageItems,
        ];
      }

      return allItems;
    } catch (error) {
      console.log(
        "GET ALL CART ITEMS ERROR:",
        error
      );

      return [];
    }
  }, [accessToken]);

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
          cartId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCartItems((previousItems) =>
        previousItems.map((item) =>
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

      throw error;
    }
  };

  const removeCartItem = async (cartId) => {
    try {
      await api.delete(
        "http://localhost:8000/api/cart/remove",
        {
          data: {
            cartId,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCartItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== cartId
        )
      );

      setCartCount((previousCount) =>
        Math.max(previousCount - 1, 0)
      );
    } catch (error) {
      console.log(
        "REMOVE CART ERROR:",
        error
      );

      throw error;
    }
  };

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

      setCartItems([]);
      setCartCount(0);
    } catch (error) {
      console.log(
        "CLEAR CART ERROR:",
        error
      );

      throw error;
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCart(1);
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  }, [accessToken, getCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        setCartItems,
        setCartCount,
        getCart,
        getAllCartItems,
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