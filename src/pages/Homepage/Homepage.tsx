import React from 'react';
import './Homepage.scss';

import { ProductsSlider } from '../../components';
import { BannerSlider, CategoryBanners } from './components';
import { getItems } from '../../core/api';

const Homepage = () => {

  const {isLoading, data} = getItems('/phones.json');

  return (
    <div className="container">

      <h1 className="pageTitle">
        Welcome to Nice Gadgets store!
      </h1>

      <BannerSlider/>

      {isLoading && <h1>Loading...</h1>}

      {!isLoading && 
      <>
        <ProductsSlider
          data={data?.data} 
          title="Brand new models" 
          filterParams="fullPrice" 
        />

        <CategoryBanners />

        <ProductsSlider 
          data={data?.data} 
          title="Hot prices" 
          filterParams="price" 
        />
      </>
      }

    </div>
  );
};

export default Homepage;
