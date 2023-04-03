import { Phone } from '../../core/types/Phone';
import { Product } from '../../core/types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.scss';

const ProductsList = ({data}: {data: Array<Product | Phone>}) => {
  
  return (
    <div className="products">
      {data.map(item => {
        const {id, name, price, discount, screen, capacity, ram, imageUrl, image, itemId, fullPrice} = item;

        // when the array has different property names
        const imgUrl = image ? image : imageUrl;
        const Id = itemId ? itemId : id;
        const itemPrice = fullPrice ? price : price-discount;
        const itemFullPrice = fullPrice ? fullPrice : price;

        return (
          <ProductCard 
            key={id}
            id={Id}
            name={name} 
            price={itemPrice} 
            fullPrice={itemFullPrice}
            screen={screen}
            capacity={capacity}
            ram={ram}
            image={imgUrl}
            productPage={true}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
