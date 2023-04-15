import './CartCard.scss';
import { GrayClose, Close, Minus, Plus, BlackMinus } from '../../../assets/icons';
import { CartItem } from '../../../core/types/Cart';
import { useCart } from '../../../core/ContextProviders/CartContext';

const CartCard = ({ data }: { data: CartItem }) => {
  const { updateCartItemQuantity, removeCartItem } = useCart();
  const { image, name, price } = data.product;
  const { quantity, id } = data;

  return (
    <div className="cartCard">
      <div className="cartCard-firstColumn">
        <img
          src={GrayClose}
          alt="Remove Cart Item from Cart"
          className="deleteIcon"
          onClick={() => removeCartItem(id)}
        />

        <div className="cartCard-image">
          <img src={image} alt="product image" />
        </div>

        <p className="body-text cartCard-name">{name}</p>
      </div>

      <div className="cartCard-secondColumn">

        <div className="cartCard-counter">
          <button
            type="button"
            className="cartCard-counter-minusButton"
            onClick={() => updateCartItemQuantity(id, false)}
            disabled={quantity === 1}
          >
            <img src={quantity === 1 ? Minus : BlackMinus} alt="" />
          </button>

          <p className="body-text cartCard-counter-quantity">{quantity}</p>

          <button
            type="button"
            className="cartCard-counter-plusButton"
            onClick={() => updateCartItemQuantity(id, true)}
          >
            <img src={Plus} alt="" />
          </button>
        </div>

        <h3 className="cartCard-price">${price * quantity}</h3>
      </div>

    </div>
  )
}

export default CartCard;