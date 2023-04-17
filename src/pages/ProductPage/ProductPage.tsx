import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';

import { Home, Arrow } from '../../assets/icons';
import { FilterSelect, ProductsList, Reload, Loader, Paginator } from '../../components';
import { NotFound, ProductDetailsPage } from '../../pages';
import { useGetItems, useFetchDataFromMultipleUrls
} from '../../core/api';
import { getProductPageData, sortData } from '../../core/dataUtils';
import { Product } from '../../core/types/Product';
import { Phone } from '../../core/types/Phone';

export interface FilterOption {
  value: string;
  label: string;
}

const ProductPage = () => {
  const {product, productId} = useParams();
  const [params, setParams] = useSearchParams();
  const [title, setTitle] = useState('');
  const [productType, setProductType] = useState('');

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

  // get data from route params
  const sortType = params.get('sort') || 'age';
  const itemsPerPage = params.get('perPage') || 'all';
  const currentPage = Number(params.get('page')) || 1;

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

  const {data: multipleQueries, isLoading: isLoadingNewApi, isError: isErrorNewApi} = useFetchDataFromMultipleUrls(
    ['phones-data'],
    ['old-phones-data'],
    '/phones.json',
    '/old-api/products.json',
    product === 'phones'
  );
  
  const {data: singleQuery, isLoading: isLoadingOldApi, isError: isErrorOldApi} = useGetItems(
    '/old-api/products.json',
    ['old-' + product + '-data'],
    product !== 'phones'
  );
  
  let isLoading = true;
  let isError = false;
  let productsData : Array<Phone | Product> = [];
  let singleProductFetchUrl;

  if (product === 'phones' && multipleQueries) {
    const query1: Phone[] = multipleQueries[0];
    const query2: Product[] = multipleQueries[1];
    const filteredPhonesFromProducts = getProductPageData(query2, productType);
    isLoading = isLoadingNewApi;
    isError = isErrorNewApi;
    productsData = [...query1, ...filteredPhonesFromProducts];
    
    if(productId){
      // check if productId is from old api
      if (query2.find((item: Product) => item.id === productId)) {
        singleProductFetchUrl = '/old-api/products/' + productId + '.json';
      } else {
        singleProductFetchUrl = '/phones/' + productId + '.json';
      }
    }
  } else if (product !== 'phones' && singleQuery) {
    const data: Product[] = singleQuery;
    productsData = getProductPageData(data, productType);    
    isLoading = isLoadingOldApi;
    isError = isErrorOldApi;
    singleProductFetchUrl = '/old-api/products/' + productId + '.json';
  }
  productsData = sortData(productsData, sortType);
  
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
  
  if(product !== 'phones' && product !== 'tablets' && product !== 'accessories'){
    return <NotFound />;
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
