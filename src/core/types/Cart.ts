/* eslint-disable no-unused-vars */
export interface cartItemProduct {
  image: string;
  price: number;
  name: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: cartItemProduct;
}

export type CartContextType = {
  cartItems: CartItem[];
  totalCount: number;
  addToCart: (product: cartItemProduct) => void;
  updateCartItemQuantity: (id: number, add: boolean) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
};
