import './Homepage.scss';

import { BannerSlider, CategoryBanners, ProductsSlider } from './components';
import { getItems } from '../../core/api';
import { Phone } from '../../core/types/Phone';
import { sortData } from '../../core/hooks';

const Homepage = () => {

  function getProductsSliderData(data: Phone[], filterKey1: string, filterKey2?: string){
    let filteredData = data.slice();
    filteredData = filteredData.filter((item) => {
  
      if(filterKey1 === 'fullPrice'){  // filter items if they have no discounts (fullPrice === price)
        return item.fullPrice === item.price; 
      } else {                        // filter items if they have discounts (fullPrice !== price)
        return item.fullPrice !== item.price;
      }
    });
  
    return sortData(filteredData, filterKey1, filterKey2);
  }

  const {isLoading, data, isError} = getItems('/phones.json', ['new-phones-data']);

  let brandNewPhones: Phone[] = [];
  let hotPricesPhones: Phone[] = [];

  if(!isLoading && !isError){
    brandNewPhones = getProductsSliderData(data, 'fullPrice');
    hotPricesPhones = getProductsSliderData(data, 'price', 'fullPrice');
  }
  
  return (
    <div className="homepage">

      <h1 className="title">
        Welcome to Nice Gadgets store!
      </h1>

      <BannerSlider/>

      <ProductsSlider
        data={brandNewPhones} 
        title="Brand new models"
        isLoading={isLoading}
        isError={isError}
      />

      <CategoryBanners />

      <ProductsSlider 
        data={hotPricesPhones}
        title="Hot prices"
        isLoading={isLoading}
        isError={isError}
      />

    </div>
  );
};

export default Homepage;
