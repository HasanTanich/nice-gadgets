import { useLocation } from "react-router-dom";
import { BackButton } from "../../components";
import { useCart } from "../../core/ContextProviders/CartContext";
import './Cart.scss';
import CartCard from "./CartCard/CartCard";

const Cart = () => {
  const { cartItems, totalCount } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="container">
      <BackButton />
      <h1 className="cartTitle">Cart</h1>
      {cartItems.length > 0 &&
        <div className="columns">
          <div className="cartItems">
            {cartItems.map(item => (
              <div className="cartItemsCard" key={item.id}>
                <CartCard key={item.id} data={item} />
              </div>
            ))}
          </div>

          <div className="checkoutBox">
            <h2>${totalPrice}</h2>
            <p className="body-text">Total for {totalCount} items</p>
            <div className="divider checkoutDivider" />
            <button type="button" onClick={() => console.log('xd')
            }>
              Checkout
            </button>
          </div>
        </div>}

      {cartItems.length === 0 &&
        <h3>Your cart is empty</h3>
      }
    </div>
  );
};

export default Cart;
