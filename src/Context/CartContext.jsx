
import React, {
  createContext,
  useState,
  useEffect
} from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);


  // Get cart items from backend
  const getCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // No logged-in user
      if (!token) {
        setCartItems([]);
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/cart/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems(response.data.data);

    } catch (error) {
      console.log(error);

      // Clear cart if request fails
      setCartItems([]);
    }
  };


  // Get cart automatically when app starts
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      getCart();
    } else {
      setCartItems([]);
    }
  }, []);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

