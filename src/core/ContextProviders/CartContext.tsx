import React, { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { CartContextType, CartItem, cartItemProduct } from '../types/Cart';
import { Toaster } from '../../components';

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const SavedCartData = localStorage.getItem('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>(SavedCartData ? JSON.parse(SavedCartData) : []);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const maxId = useMemo(() => cartItems.length > 0 ? cartItems[cartItems.length - 1].id : 0, [cartItems.length]);

  const addToCart = (product: cartItemProduct) => {
    setToastMessage('Added to cart');
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);

    if (!cartItems.find(item => item.product.name === product.name)) {
      const cartItem: CartItem = {
        id: maxId + 1,
        quantity: 1,
        product: product
      };
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeCartItem = (id: number) => {
    setToastMessage('Removed from cart');
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 1000);

    const updatedCartItems = cartItems.filter(item => {
      return item.id !== id;
    });
    setCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = (id: number, add: boolean) => {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    const updatedCartItems = [...cartItems];
    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += add ? 1 : -1;
      setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, totalCount, addToCart, updateCartItemQuantity, removeCartItem, clearCart }
      }>
      {toastVisible && <Toaster message={toastMessage} />}
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return React.useContext(CartContext) as CartContextType;
};