import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';

import { Home, Arrow } from '../../assets/icons';
import { FilterSelect, ProductsList, Reload, Loader, Paginator } from '../../components';
import { NotFound, ProductDetailsPage } from '../../pages';
import { getItems, getItemsFromMultiple } from '../../core/api';
import { getProductPageData, sortData } from '../../core/hooks';
import { Product } from '../../core/types/Product';
import { Phone } from '../../core/types/Phone';

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
  let productsData : Array<Phone | Product> = [];
  let isLoading = true;
  let isError = false;
  let singleProductFetchUrl = '';

  if (product === 'phones') {
    const multipleQueries = getItemsFromMultiple(['phones-data'], ['old-phones-data'], '/phones.json', '/old-api/products.json');
    isLoading = multipleQueries.isLoading;
    isError = multipleQueries.isError;
    if(multipleQueries.data){
      const query1 : Phone[] = multipleQueries.data[0];
      const query2 : Product[] = multipleQueries.data[1];
      const filteredPhonesFromProducts = getProductPageData(query2, 'type', productType);
      productsData = [...query1, ...filteredPhonesFromProducts];

      if(query1.find((item: Phone) => item.itemId === productId)){// check if productId is from new api
        singleProductFetchUrl = '/phones/'+productId+'.json';
      }else {
        singleProductFetchUrl = '/old-api/products/'+productId+'.json';
      }
    }
  } else {
    const singleQuery = getItems('/old-api/products.json', ['old-' + product + '-data']);
    isLoading = singleQuery.isLoading;
    isError = singleQuery.isError;
    const data : Product[] = singleQuery.data;
    
    if(data){
      productsData = getProductPageData(data, 'type', productType);
    }
    singleProductFetchUrl = '/old-api/products/'+productId+'.json';
  }

  productsData = sortData(productsData, sortType);
  
  useEffect(() => {
    // in case 'sort' or 'perPage' route params values were changed manually by user through route, and didn't match the options, reset to default.
    if(sortTypeOptions.find(item => item.value === sortType) === undefined){
      params.delete('sort');
      setParams(params, {replace: true});   
    }else if(itemsOnPageOptions.find(item => item.value === itemsPerPage) === undefined){
      params.delete('perPage');
      setParams(params, {replace: true});
    }
    
    // in case 'page' route param value was set to 0 or minus manually by user through route, reset to default.
    if(currentPage <= 0){
      params.set('page', String(1));
      setParams(params, {replace: true});
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
    }    
  },[product]);
  
  const onPageChange = (page: number) => {
    if(page === 1){
      params.delete('page');
      setParams(params, {replace: true});
    }else{
      params.set('page', page.toString());
      setParams(params);
    }
  };
  
  let currentProducts = productsData?.slice();
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
        <p className={`breadcrumbs-product ${productId ? 'currentPage' : ''}`}>{product}</p>
        
        {productId &&
        <>
          <img src={Arrow} alt="Arrow icon" className="rightArrow"/>
          <p className="breadcrumbs-product">{productId}</p>
        </>
        }

      </div>
      <div className="productContainer">
        {(productId && singleProductFetchUrl) &&
        <ProductDetailsPage 
          url={singleProductFetchUrl}
        />}

        {!productId &&
        <>
          <h1 className="productTitle">
            {title}
          </h1>

          <p className="modelsCount">{productsData.length} models</p>

          <div className="sortProducts">
            <div>
              <p className="small-text">Sort by</p>
              <FilterSelect
                options={sortTypeOptions}
                width={176}
                selectedValue={sortType}
                sortBy={true}
              />
            </div>

            <div>
              <p className="small-text">Items on page</p>
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
            {isError &&
            <div style={{margin: '10% 10%'}}>
              <h3>Something went wrong, refresh page please</h3>
              <Reload />
            </div>
            }
          </>

          {(productsData.length === 0 && !isError && !isLoading) &&
        <h3>There are no {product} yet</h3>
          }
        
          {(!isLoading && !isError) &&
          <div className="productsList">
            <ProductsList data={currentProducts}/>
          </div>
          }

          { (!isLoading && !isError && productsData.length > 0) &&
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
