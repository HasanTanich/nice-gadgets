import React, {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";
import {
  type CartContextType,
  type CartItem,
  type cartItemProduct,
} from "../types/Cart";
import { Toaster } from "../../components";

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const SavedCartData = localStorage.getItem("cart");

  const [cartItems, setCartItems] = useState<CartItem[]>(
    SavedCartData !== null ? (JSON.parse(SavedCartData) as CartItem[]) : []
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const maxId = useMemo(
    () => (cartItems.length > 0 ? cartItems[cartItems.length - 1].id : 0),
    [cartItems.length]
  );
  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const addToCart = (product: cartItemProduct) => {
    setToastMessage("Added to cart");
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);

    if (!cartItems.find((item) => item.product.name === product.name)) {
      const cartItem: CartItem = {
        id: maxId + 1,
        quantity: 1,
        product: product,
      };
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeCartItem = (id: number) => {
    setToastMessage("Removed from cart");
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 1000);

    setCartItems((currentItems) => {
      return currentItems.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const updateCartItemQuantity = (id: number, isAdd: boolean) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    const updatedCartItems = [...cartItems];
    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += isAdd ? 1 : -1;
      setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
      }}
    >
      {toastVisible && <Toaster message={toastMessage} />}
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return React.useContext(CartContext) as CartContextType;
};
