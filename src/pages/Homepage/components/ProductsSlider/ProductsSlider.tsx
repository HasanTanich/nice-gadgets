import { useEffect, useState } from 'react';
import './ProductsSlider.scss';

import { ArrowBlack, Arrow}  from '../../../../assets/icons';
import { Phone } from '../../../../core/types/Phone';
import { useOutletContext } from 'react-router-dom';
import { Loader, ProductCard } from '../../../../components';

type Props = {
  data: Phone[];
  title: string;
  isLoading: boolean;
  isError: boolean;
}

const ProductsSlider = ({data, title, isError, isLoading} : Props) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const screenSize : number = useOutletContext();
  const cardsGap = 16;
  
  
  useEffect(() => {
    let width;
    let itemsPerSlide = 4;

    if(screenSize <= 639){
      itemsPerSlide = 1;
      width = 212;
    }else if(screenSize <= 809){
      itemsPerSlide = 2;
      width = 238;
    }else if(screenSize <= 1139){
      itemsPerSlide = 3;
      width = 238;
    }else {
      width = 272 ;
    }
    setCardWidth(width+cardsGap);
    setMaxIndex(data?.length - itemsPerSlide);
    if(activeIndex >= maxIndex){
      setActiveIndex(maxIndex);
    }
  }, [activeIndex, screenSize]);
  
  const updateIndex = (newIndex: number) => {
    if(newIndex < 0){
      newIndex = 0;
    }else if (newIndex > maxIndex){
      newIndex = maxIndex;
    }
    setActiveIndex(newIndex);
  };
  
  if(isLoading){
    return <Loader />;
  }

  return (
    <div className="products-slider">

      <div className="titleArrows">

        <h2 className="titleArrows-title">{title}</h2>

        <div className="titleArrows-arrows">
          <button type="button" onClick={() => updateIndex(activeIndex-1)} disabled={(activeIndex === 0)}>
            <img src={activeIndex === 0 ? Arrow : ArrowBlack} alt="previous item icon" className="leftArrow" />
          </button>
          <button type="button" onClick={() => updateIndex(activeIndex+1)} disabled={activeIndex === maxIndex}>
            <img src={activeIndex === maxIndex ? Arrow : ArrowBlack} alt="next item icon" className="rightArrow"/>
          </button>
        </div>

      </div>

      <>
        {isError && <h4>Something went wrong, data not found</h4>}
      </>

      {(data?.length === 0 && !isError) && <h4>No products available</h4>}

      {(data?.length > 0 && !isError) &&
        <div className="cardsBox">
          {data.map( (item) => {
            const {id, name, price, fullPrice, screen, capacity, ram, image, itemId} = item;
            
            return (
              <ProductCard 
                key={id}
                id={itemId}
                activeIndex={activeIndex}
                cardWidth={cardWidth}
                name={name} 
                price={price} 
                fullPrice={fullPrice} 
                screen={screen}
                capacity={capacity}
                ram={ram}
                image={image}
              />
            );
          })}
        </div>}

    </div>
  );
};

export default ProductsSlider;
