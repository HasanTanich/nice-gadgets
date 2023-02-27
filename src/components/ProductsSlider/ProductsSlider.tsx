import React, { useState } from 'react';
import './ProductsSlider.scss';

import { ArrowBlack, Heart, Arrow}  from '../../assets/icons';
import { Phone } from '../../core/types/Phone';
import { filterData } from '../../core/hooks';

type Props = {
  screenSize: number;
  data: Phone[];
  title: string;
  filterParams: string;
}

const ProductsSlider = ({screenSize, data, title, filterParams} : Props) => {

  const CARD_GAP = 16;
  const SMALL_SCREEN_SIZE = 640;
  const MEDIUM_SCREEN_SIZE = 1200;

  const getWidth = () => {
    let width;
    if(screenSize < SMALL_SCREEN_SIZE){
      width = 212;
    }else if(screenSize < MEDIUM_SCREEN_SIZE){
      width = 238;
    }else {
      width = 272 ;
    }
    return width;
  };

  const visibleProducts = filterData(data, filterParams);

  const [transform, setTransform] = useState(0);
  const itemWidth = getWidth();
  const maxTransform = -1 * (visibleProducts.length * itemWidth + (visibleProducts.length - 1) * CARD_GAP - screenSize) - itemWidth;

  const nextProduct = () => {
    setTransform(transform-itemWidth - CARD_GAP);
  };

  const prevProduct = () => {
    if(transform + itemWidth + 16 >= 0){
      setTransform(0);
    }
    else {
      setTransform(transform+itemWidth + CARD_GAP);
    }
  };


  return (
    <div className="products-slider">

      <div className="titleArrows">
        <h2>{title}</h2>
        <div className="titleArrows-arrows">

          <button type="button" onClick={prevProduct} disabled={transform >= 0}>
            <img src={transform >= 0 ? Arrow : ArrowBlack} alt="previous item icon" className="leftArrow" />
          </button>
          <button type="button" onClick={nextProduct} disabled={transform <= maxTransform}>
            <img src={transform <= maxTransform ? Arrow : ArrowBlack} alt="next item icon" className="rightArrow"/>
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
                  transform: `translateX(${transform}px)`,
                  transition: '1s',
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
          })};
        </div>}

    </div>
  );
};

export default ProductsSlider;
