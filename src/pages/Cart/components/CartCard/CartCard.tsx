import "./CartCard.scss";
import { GrayClose, Minus, Plus, RedMinus } from "../../../../assets/icons";
import { type CartItem } from "../../../../core/types/Cart";
import { useCart } from "../../../../core/ContextProviders/CartContext";

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
            onClick={() => updateCartItemQuantity(id, false)}
            className={`${quantity > 1 ? "imageLink" : ""}`}
            disabled={quantity === 1}
          >
            <img src={quantity === 1 ? Minus : RedMinus} alt="" />
          </button>

          <p className="body-text cartCard-counter-quantity">{quantity}</p>

          <button
            type="button"
            onClick={() => updateCartItemQuantity(id, true)}
            className="imageLink"
          >
            <img src={Plus} alt="" />
          </button>
        </div>

        <h3 className="cartCard-price">${price * quantity}</h3>
      </div>
    </div>
  );
};

export default CartCard;
