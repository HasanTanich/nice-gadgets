import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';

import { Home, Arrow } from '../../assets/icons';
import { FilterSelect, ProductsList, Reload, Loader, Paginator } from '../../components';
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

  if(product !== 'phones' && product !== 'tablets' && product !== 'accessories'){
    return <NotFound />;
  }

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
  
  const [params, setParams] = useSearchParams();
  const [title, setTitle] = useState('');
  const [productType, setProductType] = useState('');
  const sortType = params.get('sort') || 'age';
  const itemsPerPage = params.get('perPage') || 'all';
  const currentPage = Number(params.get('page')) || 1;
  let productsData : Product[] = [];

  useEffect(() => {    
    // in case 'sort' or 'perPage' route params values were changed manually by user through route, and didn't match the options, set it to default.
    if(sortTypeOptions.find(item => item.value === sortType) === undefined){
      params.delete('sort');
      setParams(params);    
    }else if(itemsOnPageOptions.find(item => item.value === itemsPerPage) === undefined){
      params.delete('perPage');
      setParams(params);
    }
  }, []);
  

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
    

  const {data, isLoading, error} = getItems('/old-api/products.json', 'product-'+product+'-data');
  
  if(!isLoading && !error){    
    productsData = getProductPageData(data?.data, 'type', productType, sortType);
  }
  
  const onPageChange = (page: number) => {    
    if(page === 1){
      params.delete('page');
      setParams(params);
    }else{
      params.set('page', page.toString());
      setParams(params);
    }
  };
  
  let currentProducts = productsData.slice();
  if(itemsPerPage!== 'all'){
    const indexOfLastProduct = currentPage * Number(itemsPerPage);
    const indexOfFirstProduct = indexOfLastProduct - Number(itemsPerPage);
    currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);
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

          <p className="modelsCount">{productsData.length} models</p>

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

          {(productsData.length === 0 && !error && !isLoading) &&
        <h3>There are no {product} yet</h3>
          }
        
          {(!isLoading && !error) &&
          <div className="productsList">
            <ProductsList data={currentProducts}/>
          </div>
          }

          { (!isLoading && !error && productsData.length > 0) &&
            <Paginator
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalItems={productsData.length}
            />}
        </>
        }

      </div>
    </>
  );
};

export default ProductPage;
