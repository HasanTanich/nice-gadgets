import { useParams } from 'react-router-dom';
import { getItems } from '../../core/api';
import './ProductDetailsPage.scss';

const ProductDetailsPage = () => {
  const {productId} = useParams();
  
  const {data} = getItems('/old-api/products/'+productId+'.json', productId+'-data');  
  console.log(data?.data);
  
  return (
    <div>ProductDetailsPage</div>
  );
};

export default ProductDetailsPage;
