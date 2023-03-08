import React, { useEffect, useState } from 'react';
import './BannerSlider.scss';

import { ArrowBlack} from '../../../../assets/icons';
import { Banner1, Banner2, Banner3, MobileBanner1, MobileBanner2, MobileBanner3 } from '../../../../assets/img/homepage-banners';
import { useOutletContext } from 'react-router-dom';

const BannerSlider = () => {
  const BannerImages = [
    Banner1,
    Banner2,
    Banner3,
  ];
  const MobileBannerImages = [
    MobileBanner1, 
    MobileBanner2, 
    MobileBanner3,
  ];

  const screenSize : number = useOutletContext();
  const [phone, setPhone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const productslength = BannerImages.length;
  
  useEffect(() => {
    if (screenSize <= 639) {
      setPhone(true);
    }else {
      setPhone(false);
    }
  }, [screenSize]);

  useEffect( () => {
    const interval = setInterval(() => {
      if(!paused) {
        updateIndex(activeIndex+1);
      }
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const updateIndex = (newIndex: number) => {
    if(newIndex < 0){
      newIndex = productslength -1;
    }else if (newIndex >= productslength){
      newIndex = 0;
    }
    setActiveIndex(newIndex);
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
      updateIndex(activeIndex-1);
    } else if (deltaX < -70) {
      updateIndex(activeIndex+1);
    }
  };

  return (
    <div className="bannerSlider">

      <button 
        onClick={()=> updateIndex(activeIndex-1)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img src={ArrowBlack} alt="banner img" className="leftArrow"/>
      </button>

      {phone && <div className="bannerSlider-banners">
        {MobileBannerImages.map((item, index) =>
          <img
            key={index}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            src={item}
            alt="banner img"
            className="bannerSlider-banners-banner" 
            style={{transform: `translateX(-${activeIndex * 100}%)`}}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          />
        )}
      </div>}
      
      {!phone && <div className="bannerSlider-banners">
        {BannerImages.map((item, index) =>
          <img
            key={index}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            src={item}
            alt="banner img"
            className="bannerSlider-banners-banner"
            style={{transform: `translateX(-${activeIndex * 100}%)`}}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          />
        )}
      </div>}

      <button 
        onClick={() => updateIndex(activeIndex+1)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img src={ArrowBlack} alt="banner img" className="rightArrow"/>
      </button>

      <div className="sliderDots">
        {BannerImages.map((item, index) =>
          <div 
            key={index} 
            className="sliderDots-dotBox" 
            onClick={() => updateIndex(index)}
          >
            <div className={`sliderDots-dot sliderDots-dot${activeIndex === index ? '-active' : ''}`} />
          </div>
        )}
      </div>
      
    </div>
  );
};
  
export default BannerSlider;
