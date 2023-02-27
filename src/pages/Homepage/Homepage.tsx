import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Homepage.scss';

import {ProductCard} from '../../components';
import BannerSlider from './components/BannerSlider';
import { getItems } from '../../core/api';
import CategoryBanners from './components/CategoryBanners';

type ContextObject = {
  screenSize: number;
  phone: boolean;
}

const Homepage = () => {

  const {isLoading, data, error} = getItems('/phones.json');
  console.log(isLoading, error);

  const contextObject: ContextObject = useOutletContext();
  const {phone, screenSize} = contextObject;

  return (
    <div className="container">

      <h1 className="title">
        Welcome to Nice Gadgets store!
      </h1>

      <BannerSlider screenSize={screenSize} phone={phone}/>
      

      {isLoading && <h1>Loading...</h1>}

      {!isLoading && 
      <>
        <ProductCard 
          screenSize={screenSize} 
          data={data?.data} 
          title="Brand new models" 
          filterParams="fullPrice" 
        />

        <CategoryBanners />

        <ProductCard 
          screenSize={screenSize} 
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
