import { useParams } from 'react-router-dom';
import { getItems } from '../../core/api';
import './ProductDetailsPage.scss';

const ProductDetailsPage = () => {
  const {productId} = useParams();
  
  const {data} = getItems('/old-api/products/'+productId+'.json', productId+'-data');  
  return (
    <>
      <h1>{productId}</h1>
      {data && 
      <img src={data?.data.images[0]} alt="" />
      }
    </>
  );
};

export default ProductDetailsPage;
