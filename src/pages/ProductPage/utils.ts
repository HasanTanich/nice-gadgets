import { useGetItems, useFetchDataFromMultipleUrls } from '../../core/api';
import { getProductsFromType } from '../../core/dataUtils';

import { Phone } from '../../core/types/Phone';
import { Product } from '../../core/types/Product';

type ProductData = {
    isLoading: boolean;
    isError: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    productDetailsFetchUrl: string;
}

export function GetProductData(product: string | undefined, productType: string, id: string | undefined, searchQuery: string | null) : ProductData {
  let productDetailsFetchUrl = '';

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
    
  if (product === 'phones' && multipleQueries) {
    const phonesFromNewApi: Phone[] = multipleQueries[0];
    const productsFromOldApi: Product[] = multipleQueries[1];
    const phonesFromOldApi = getProductsFromType(productsFromOldApi, productType);
    let data = [...phonesFromNewApi, ...phonesFromOldApi];
    if(id){
      // check if id is from old api
      if (productsFromOldApi.find((item: Product) => item.id === id)) {
        productDetailsFetchUrl = '/old-api/products/' + id + '.json';
      } else {
        productDetailsFetchUrl = '/phones/' + id + '.json';
      }
    }
    if(searchQuery){
      data = data.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return {isLoading: isLoadingNewApi, isError: isErrorNewApi, data, productDetailsFetchUrl: productDetailsFetchUrl};
  } else if (product !== 'phones' && singleQuery) {
    let data = getProductsFromType(singleQuery, productType);
    if(searchQuery){
      data = data.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    productDetailsFetchUrl = '/old-api/products/' + id + '.json';
    return {isLoading: isLoadingOldApi, isError: isErrorOldApi, data, productDetailsFetchUrl};
  }
  return {isLoading: true, isError: false, data: [], productDetailsFetchUrl: ''};
}