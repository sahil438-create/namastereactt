// CartContext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);

    setCartTotal((prevTotal) => prevTotal + 1);
  };
  console.log(cart, 'cart');

  return (
    <CartContext.Provider value={{ cart, cartTotal, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
