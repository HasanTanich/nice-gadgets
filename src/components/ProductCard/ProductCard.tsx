import './ProductCard.scss';
import { Heart } from '../../assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../core/ContextProviders/CartContext';

type Props = {
    activeIndex?: number;
    cardWidth?: number;
    productPage?: boolean;
    name: string;
    fullPrice: number;
    price: number;
    screen: string;
    capacity: string;
    ram: string;
    image: string;
    id: string
}

const ProductCard = ({activeIndex, cardWidth, name, fullPrice, price, screen, capacity, ram, image, productPage, id}: Props) => {
  const {product, productId} = useParams();
  const navigate = useNavigate();
  const {addToCart} = useCart();

  const navigateToItem = () => {
    if(product){
      navigate(id);
    } else if(productId){
      navigate(id);
    } else{
      navigate(`phones/${id}`);
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div
      className={`card ${productPage ? 'productPageCard' : ''}`} 
      style={{ transform: activeIndex && cardWidth ? `translateX(-${activeIndex * cardWidth}px)` : '' }}
    >
      <img src={image} alt={name} className="card-img imageLink" onClick={navigateToItem}/>

      <p className="card-title" onClick={navigateToItem}>
        {name}
      </p>
              
      <div className="card-priceBox">
        <h3 className="card-priceBox-price">${price}</h3>
        {(price !== fullPrice) &&<p className="card-priceBox-oldPrice">${fullPrice}</p>}
      </div>

      <hr className="card-divider" />

      <div className="card-specsBox">
        <div className="card-specsBox-spec small-text">
          <p className="card-specsBox-spec-title">Screen</p>
          <p className="card-specsBox-spec-value">{screen}</p>
        </div>
        <div className="card-specsBox-spec small-text">
          <p className="card-specsBox-spec-title">Capacity</p>
          <p className="card-specsBox-spec-value">{capacity}</p>
        </div>
        <div className="card-specsBox-spec small-text">
          <p className="card-specsBox-spec-title">RAM</p>
          <p className="card-specsBox-spec-value">{ram}</p>
        </div>
      </div>

      <div className="card-buttons">
        <button 
          type="button" 
          className="card-buttons-addToCart"
          onClick={() => addToCart({image, price, name})}
        >
              Add to cart
        </button>

        <button type="button" className="card-buttons-like">
          <img src={Heart} alt="like" className="imageLink"/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;