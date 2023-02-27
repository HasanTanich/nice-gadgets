import React, { useState } from 'react';
import './BannerSlider.scss';

import { BannerImage } from '../../../core/types/BannerImage';
import { ArrowBlack} from '../../../assets/icons';
import { Banner1, Banner2, Banner3, MobileBanner1, MobileBanner2, MobileBanner3} from '../../../assets/img/homepage-banners';

const BannerSlider = ({phone, screenSize}: {screenSize: number, phone: boolean}) => {
  
  const getBannerWidth = () => {
    
    let width = 1040;
    if(screenSize < 640){
      width = 320;
    }else if(screenSize < 1200){
      width = 490;
    }
    return -width;
  };
  
  // Todo change banner every 5 seconds automatically
  
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [transform, setTransform] = useState(0);
  const bannerWidth = getBannerWidth();

  const BannerImages = [
    {img: Banner1, position: 0},
    {img: Banner2, position: bannerWidth},
    {img: Banner3, position: bannerWidth*2},
  ];

  const MobileBannerImages = [
    {img: MobileBanner1, position: 0},
    {img: MobileBanner2, position: bannerWidth},
    {img: MobileBanner3, position: bannerWidth*2},
  ];

  const nextBanner = () => {
    if(transform === bannerWidth * (BannerImages.length-1)){
      setTransform(0);
    }else{
      setTransform(transform+bannerWidth);
    }
  };

  const prevBanner = () => {
    if(transform === 0){
      setTransform(bannerWidth * (BannerImages.length - 1) );
    }else{
      setTransform(transform-bannerWidth);
    }
  };

  const onChooseBanner = (item: BannerImage) => {
    if(item.position !== transform){
      setTransform(item.position);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = () => {
    if (!isSwiping) {
      return;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    setIsSwiping(false);

    const currentX = e.changedTouches[0].clientX;
    const deltaX = currentX - startX;

    if (deltaX > 70) {
      prevBanner();
    } else if (deltaX < -70) {
      nextBanner();
    }
  };

  return (
    <div className="bannerSlider">

      <button className="bannerSlider-leftButton" onClick={prevBanner}>
        <img src={ArrowBlack} alt="banner img" className="" />
      </button>

      {phone && <div className="bannerSlider-banners" style={{width: bannerWidth * -1}}>
        {MobileBannerImages.map((item, index) =>
          <img
            key={index}
            src={item.img}
            alt="banner img"
            className="bannerSlider-banners-banner" 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(${transform}px)`,
              transition: '1s',
              minWidth: bannerWidth * -1
            }} 
          />
        )}
      </div>}
      
      {!phone && <div className="bannerSlider-banners" style={{width: bannerWidth * -1}}>
        {BannerImages.map((item, index) =>
          <img
            key={index}
            src={item.img}
            alt="banner img"
            className="bannerSlider-banners-banner"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(${transform}px)`,
              transition: '1.5s',
              minWidth: bannerWidth * -1
            }}
          />
        )}
      </div>}

      <button className="bannerSlider-rightButton" onClick={nextBanner}>
        <img src={ArrowBlack} alt="banner img" className="" />
      </button>

      <div className="sliderDots">
        {BannerImages.map((item, index) =>
          <div 
            key={index} 
            className="sliderDots-dotBox" 
            onClick={() => onChooseBanner(item)}
          >
            <div className={`sliderDots-dot sliderDots-dot${transform === item.position ? '-active' : ''}`} />
          </div>
        )}
      </div>
      
    </div>
  );
};
  
export default BannerSlider;
