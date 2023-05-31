import { useEffect, useMemo } from 'react';
import './ProductPage.scss';

import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Home, Arrow } from '../../assets/icons';
import { FilterSelect, ProductsList, Reload, Loader, Paginator } from '../../components';
import { NotFound, ProductDetailsPage } from '../../pages';
import { sortData } from '../../core/dataUtils';
import { GetProductData } from './utils';

export interface FilterOption {
  value: string;
  label: string;
}

const ProductPage = () => {
  const location = useLocation();
  const {product, productId} = useParams();
  const [params, setParams] = useSearchParams();

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

  // Data from route params
  const sortType = params.get('sort') || 'age';
  const itemsPerPage = params.get('perPage') || 'all';
  const currentPage = Number(params.get('page')) || 1;
  const searchQuery = params.get('query');

  // if state is passed scroll to the top of the page
  useEffect(() => {
    if(location.state){
      window.scrollTo({top: 0});
    }
  }, []);
  
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

  const {title, productType} = useMemo(() => {
    switch (product) {
    case 'phones':
      return {title: 'Mobile Phones', productType: 'phone'};
    case 'tablets':
      return {title: 'Tablets', productType: 'tablet'};
    case 'accessories':
      return {title: 'Accessories', productType: 'accessory'};
    default:
      return {title: '', productType: ''};
    }
  }, [product]);

  const {isLoading, isError, data, productDetailsFetchUrl} = GetProductData(product, productType, productId, searchQuery);

  const currentProducts = useMemo(()=> {
    if(itemsPerPage === 'all'){
      return sortData(data, sortType);
    }else {
      const indexOfLastProduct = currentPage * Number(itemsPerPage);
      const indexOfFirstProduct = indexOfLastProduct - Number(itemsPerPage);
      sortData(data, sortType);
      return data.slice(indexOfFirstProduct, indexOfLastProduct);
    }
  }, [data]);
  
  const onPageChange = (page: number) => {
    if(page === 1){
      params.delete('page');
      setParams(params, {replace: true});
    }else{
      params.set('page', page.toString());
      setParams(params);
    }
  };

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
        </>}

      </div>
      <div className="container">
        {(productId && productDetailsFetchUrl) &&
        <ProductDetailsPage 
          url={productDetailsFetchUrl}
        />}

        {!productId &&
        <>
          <h1 className="productTitle">
            {title}
          </h1>

          <p className="modelsCount">{data.length} models</p>

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
        </div>}

          <>
            {isError &&
            <div style={{margin: '10% 10%'}}>
              <h3>Something went wrong, refresh page please</h3>
              <Reload />
            </div>}
          </>

          {(data.length === 0 && !searchQuery && !isError && !isLoading) &&
        <h3>There are no {product} yet</h3>}

          {(currentProducts.length === 0 && searchQuery && !isError && !isLoading) &&
        <h4>No results found for {'\''+searchQuery+'\''}</h4>}
        
          {(!isLoading && !isError) &&
          <div className="productsList">
            <ProductsList data={currentProducts}/>
          </div>}

          {(!isLoading && !isError && data.length > 0) &&
            <Paginator
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalItems={data.length}
            />}
        </>}
      </div>
    </>
  );
};

export default ProductPage;
