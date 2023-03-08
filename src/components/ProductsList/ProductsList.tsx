import { Product } from '../../core/types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.scss';

const ProductsList = ({data}: {data: Product[]}) => {
  
  return (
    <div className="products">
      {data.map(item => {
        const {id, name, price, discount, screen, capacity, ram, imageUrl} = item;
        
        return (
          <ProductCard 
            key={id}
            id={id}
            name={name} 
            price={price - discount} 
            fullPrice={price} 
            screen={screen}
            capacity={capacity}
            ram={ram}
            image={imageUrl}
            productPage={true}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
