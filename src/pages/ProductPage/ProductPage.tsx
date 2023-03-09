import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';

import { Home, Arrow } from '../../assets/icons';
import { FilterSelect, ProductsList, Reload, Loader } from '../../components';
import { NotFound, ProductDetailsPage } from '../../pages';
import { getItems } from '../../core/api';
import { getProductPageData } from '../../core/hooks';
import { Product } from '../../core/types/Product';

export interface FilterOption {
  value: string;
  label: string;
}

const ProductPage = () => {

  const {product, productId} = useParams();
  const [params] = useSearchParams();
  const [productType, setProductType] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (product) {
    case 'phones':
      setTitle('Mobile Phones');
      setProductType('phone');
      break;
    case 'tablets':
      setTitle('Tablets');
      setProductType('tablet');
      break;
    case 'accessories':
      setTitle('Accessories');
      setProductType('accessory');
      break;
    default:
      break;
    }
  },[product]);
  

  if(product !== 'phones' && product !== 'tablets' && product !== 'accessories'){
    return <NotFound />;
  }
  
  const sortType = params.get('sort') || 'age';
  const itemsPerPage = params.get('perPage') || 'all';
    
  const sortTypeOptions : FilterOption[] = [
    { value: 'age', label: 'Newest' },
    { value: 'name', label: 'Alphabatically' },
    { value: 'price', label: 'Cheapest' }
  ];
  const itemsOnPageOptions: FilterOption[] = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'all' }
  ];

  const {data, isLoading, error} = getItems('/old-api/products.json', 'product-'+product+'-data');
  let visibleProducts: Product[] = [];
  if(!isLoading && !error){
    visibleProducts = getProductPageData(data?.data, 'type', productType, sortType);
  }

  return (
    <>
      <div className="breadcrumbs">

        <img src={Home} alt="Home icon" />
        <img src={Arrow} alt="Arrow icon" className="rightArrow"/>
        <p className={`product ${productId ? 'currentProductPage' : ''}`}>{product}</p>
        
        {productId && 
        <>
          <img src={Arrow} alt="Arrow icon" className="rightArrow"/>
          <p className="product">{productId}</p>
        </>
        }

      </div>
      <div className="container">
        {productId && <ProductDetailsPage />}

        {!productId &&
        <>
          <h1 className="productTitle">
            {title}
          </h1>

          <p className="modelsCount">95 models</p>

          <div className="sortProducts">
            <div>
              <p>Sort by</p>
              <FilterSelect 
                options={sortTypeOptions}
                width={176}
                selectedValue={sortType}
                sortBy={true}
              />
            </div>

            <div>
              <p>Items on page</p>
              <FilterSelect 
                options={itemsOnPageOptions}
                width={128}
                selectedValue={itemsPerPage}
              />
            </div>
          </div>
        
          {isLoading && 
        <div style={{margin: '10% 10%'}}>
          <Loader />
        </div>
          }

          <>
            {error &&
            <div style={{margin: '10% 10%'}}>
              <h3>Something went wrong, refresh page please</h3>
              <Reload />
            </div>
            }
          </>

          {(visibleProducts.length === 0 && !error && !isLoading) &&
        <h3>There are no {product} yet</h3>
          }
        
          {(!isLoading && !error) &&
        <ProductsList data={visibleProducts}/>
          }

        </>
        }

      </div>
    </>
  );
};

export default ProductPage;
