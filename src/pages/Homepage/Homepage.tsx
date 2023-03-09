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

  const {isLoading, data, error} = getItems('/phones.json', 'phones-data');

  let brandNewPhones: Phone[] = [];
  let hotPricesPhones: Phone[] = [];

  if(!isLoading && !error){
    brandNewPhones = getProductsSliderData(data?.data, 'fullPrice');
    hotPricesPhones = getProductsSliderData(data?.data, 'price', 'fullPrice');
  }
  
  return (
    <div className="container">

      <h1 className="title">
        Welcome to Nice Gadgets store!
      </h1>

      <BannerSlider/>

      {!isLoading && 
      <>
        <ProductsSlider
          data={brandNewPhones} 
          title="Brand new models"
          error={error}
        />

        <CategoryBanners />

        <ProductsSlider 
          data={hotPricesPhones}
          title="Hot prices"
          error={error}
        />
      </>
      }

    </div>
  );
};

export default Homepage;
