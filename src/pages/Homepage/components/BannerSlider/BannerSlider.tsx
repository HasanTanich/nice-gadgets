import type React from "react";
import { useEffect, useState } from "react";
import "./BannerSlider.scss";

import { ArrowBlack } from "../../../../assets/icons";
import {
  Banner1,
  Banner2,
  Banner3,
  MobileBanner1,
} from "../../../../assets/img/homepage-banners";
import { useOutletContext } from "react-router-dom";

const BannerSlider = () => {
  const screenSize: number = useOutletContext();

  const BannerImages = [
    screenSize <= 639 ? MobileBanner1 : Banner1,
    Banner2,
    Banner3,
  ];

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const productslength = BannerImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = productslength - 1;
    } else if (newIndex >= productslength) {
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
      updateIndex(activeIndex - 1);
    } else if (deltaX < -70) {
      updateIndex(activeIndex + 1);
    }
  };

  return (
    <>
      <div className="bannerSlider">
        <button
          onClick={() => updateIndex(activeIndex - 1)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <img src={ArrowBlack} alt="banner img" className="leftArrow" />
        </button>

        <div className="bannerSlider-banners">
          {BannerImages.map((item, index) => (
            <div
              key={index}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`bannerSlider-banners-banner bannerSlider-banners-banner-${
                index + 1
              }`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <img src={item} alt="banner img" />
            </div>
          ))}
        </div>

        <button
          onClick={() => updateIndex(activeIndex + 1)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <img src={ArrowBlack} alt="banner img" className="rightArrow" />
        </button>
      </div>
      <div className="sliderDots">
        {BannerImages.map((item, index) => (
          <div
            key={index}
            className="sliderDots-dotBox"
            onClick={() => updateIndex(index)}
          >
            <div
              className={`sliderDots-dot sliderDots-dot${
                activeIndex === index ? "-active" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BannerSlider;
