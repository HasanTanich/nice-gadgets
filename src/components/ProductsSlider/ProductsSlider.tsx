import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';

import { ArrowBlack, Heart, Arrow}  from '../../assets/icons';
import { Phone } from '../../core/types/Phone';
import { filterData } from '../../core/hooks';

type Props = {
  data: Phone[];
  title: string;
  filterParams: string;
}

const ProductsSlider = ({data, title, filterParams} : Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const visibleProducts = filterData(data, filterParams);
  const [cardWidth, setCardWidth] = useState(0);
  const screenWidth = window.innerWidth;
  const cardsGap = 16;
  
  useEffect(() => {
    let width;
    let itemsPerSlide = 4;

    if(screenWidth <= 639){
      itemsPerSlide = 1;
      width = 212;
    }else if(screenWidth <= 809){
      itemsPerSlide = 2;
      width = 238;
    }else if(screenWidth <= 1139){
      itemsPerSlide = 3;
      width = 238;
    }else {
      width = 272 ;
    }
    setCardWidth(width+cardsGap);
    setMaxIndex(visibleProducts.length - itemsPerSlide);
  }, [activeIndex, screenWidth]);
  
  const updateIndex = (newIndex: number) => {
    if(newIndex < 0){
      newIndex = 0;
    }else if (newIndex > maxIndex){
      newIndex = maxIndex;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="products-slider">

      <div className="titleArrows">
        <h2 className="titleArrows-title">{title}</h2>
        <div className="titleArrows-arrows">

          <button type="button" onClick={() => updateIndex(activeIndex-1)} disabled={activeIndex===0}>
            <img src={activeIndex === 0 ? Arrow : ArrowBlack} alt="previous item icon" className="leftArrow" />
          </button>
          <button type="button" onClick={() => updateIndex(activeIndex+1)} disabled={activeIndex === maxIndex}>
            <img src={activeIndex === maxIndex ? Arrow : ArrowBlack} alt="next item icon" className="rightArrow"/>
          </button>
          
        </div>
        
      </div>

      {visibleProducts.length === 0 && 
      <h4>No products available</h4>
      }

      {visibleProducts.length > 0 &&
        <div className="cardsBox">
          {visibleProducts.map( (item) => {
            const {id, name, price, fullPrice, screen, capacity, ram, image} = item;
            
            return (
              <div
                key={id}
                className="cardsBox-card" 
                style={{
                  transform: `translateX(-${activeIndex * cardWidth}px)`,
                }}
              >

                <img src={image} alt={name} className="cardsBox-card-img"/>

                <p className="cardsBox-card-title">
                  {name}
                </p>
              
                <div className="cardsBox-card-priceBox">
                  <h3 className="cardsBox-card-priceBox-price">${price}</h3>
                  {(price !== fullPrice) &&<p className="cardsBox-card-priceBox-oldPrice">${fullPrice}</p>}
                </div>

                <hr className="cardsBox-card-divider" />

                <div className="cardsBox-card-specsBox">
                  <div className="cardsBox-card-specsBox-spec">
                    <p className="cardsBox-card-specsBox-spec-title">Screen</p>
                    <p className="cardsBox-card-specsBox-spec-value">{screen}</p>
                  </div>
                  <div className="cardsBox-card-specsBox-spec">
                    <p className="cardsBox-card-specsBox-spec-title">Capacity</p>
                    <p className="cardsBox-card-specsBox-spec-value">{capacity}</p>
                  </div>
                  <div className="cardsBox-card-specsBox-spec">
                    <p className="cardsBox-card-specsBox-spec-title">RAM</p>
                    <p className="cardsBox-card-specsBox-spec-value">{ram}</p>
                  </div>
                </div>

                {/* // Todo Add to cart */}
                <div className="cardsBox-card-buttons">
                  <button type="button" className="cardsBox-card-buttons-addToCart">
              Add to cart
                  </button>

                  {/* // Todo Add to favourites */}
                  <button type="button" className="cardsBox-card-buttons-like">
                    <img src={Heart} alt="like" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>}

    </div>
  );
};

export default ProductsSlider;
