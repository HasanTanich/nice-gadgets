import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { CartContextType, CartItem, cartItemProduct } from '../types/Cart';

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const SavedCartData = localStorage.getItem('cart');
    const [cartItems, setCartItems] = useState<CartItem[]>(SavedCartData ? JSON.parse(SavedCartData) : []);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const addToCart = (product: cartItemProduct) => {
        if (cartItems.find(item => item.product.name === product.name)) {
            alert('added to cart');
        } else {
            const cartItem: CartItem = {
                id: cartItems.length + 1,
                quantity: 1,
                product: product
            }
            setCartItems([...cartItems, cartItem]);
        }
    };

    const removeCartItem = (id: number) => {
        setCartItems(cartItems.filter(item => {
            return item.id !== id;
        }));
    };

    const updateCartItemQuantity = (id: number, add: boolean) => {
        let updatedCart = [...cartItems];
        updatedCart.map(item => {
            if (add) {
                return item.id === id && item.quantity++;
            } else {
                return item.id === id && item.quantity--;
            }
        });
        setCartItems(updatedCart);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])


    return (
        <CartContext.Provider
            value={{ cartItems, totalCount, addToCart, updateCartItemQuantity, removeCartItem }
            }>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => {
    return React.useContext(CartContext) as CartContextType;
}