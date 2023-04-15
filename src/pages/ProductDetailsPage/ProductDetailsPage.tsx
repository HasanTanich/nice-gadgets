import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';

import { Heart } from '../../assets/icons';
import { Loader, BackButton } from '../../components';
import { useGetItems } from '../../core/api';
import { ProductsSlider } from '../Homepage/components';
import { useGetSuggestedProducts } from '../../core/dataUtils';
import Tech from './Tech';
import { useCart } from '../../core/ContextProviders/CartContext';

const ProductDetailsPage = ({url} : {url : string}) => {
  const navigate = useNavigate();
  const {productId} = useParams();
  const {addToCart} = useCart();
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const {data, isLoading, isError} = useGetItems(url, [productId+'-data']);
  const suggestedProducts = useGetSuggestedProducts('/phones.json', 'phones');

  useEffect(() => {
    if(data){
      setSelectedColor(data?.color);
      setSelectedCapacity(data?.capacity);      
    }
  }, [isLoading]);
  
    const onSelectedColor = (color: string) => {
    if(selectedColor!== color){
      setSelectedColor(color);
      const newUrl = `/phones/${data.namespaceId}-${data.capacity.toLowerCase()}-${color}`;
      navigate(newUrl);
    }
  };
  
  const onSelectedCapacity = (capacity: string) => {
    if(selectedCapacity !== capacity){
      setSelectedCapacity(capacity);
      const newUrl = `/phones/${data.namespaceId}-${capacity.toLowerCase()}-${selectedColor}`;
      navigate(newUrl);
    }
  };

  const updateImageIndex = (i : number) => {
    const imagesLength = data.images.length - 1;
    if(i < 0){
      setImageActiveIndex(0);
    }else if(i > imagesLength){
      setImageActiveIndex(imagesLength)
    }else {
      setImageActiveIndex(i);
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
      updateImageIndex(imageActiveIndex-1);
    } else if (deltaX < -70) {
      updateImageIndex(imageActiveIndex+1);
    }
  };
  
  if(isLoading){
    return <Loader />;
  }

  if(isError){
    return <h3>Product was not found</h3>;
  }

  const { name, images, colorsAvailable, capacityAvailable, priceRegular, priceDiscount,
    screen, resolution, ram, processor, description, camera, zoom, cell, capacity,
  } = data;
  
  return (
    <>
      <BackButton />      

      <h2>{name}</h2>

      <div className="productCustomization">
        <div className="productCustomization-productImages">
          {images.map((item : string, index: number) =>
            <div 
              key={index} 
              className={`productCustomization-productImages-image productCustomization-productImages-image--${index === imageActiveIndex ? 'active' : ''}`}
              onClick={ () => updateImageIndex(index)}
            >
              <img
                src={item}
                alt="product image"
              />
            </div>
          )}
        </div>

        <div 
          className="productCustomization-imageSelectedBox"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={images[imageActiveIndex]} 
            alt="image selected"
            className="productCustomization-imageSelectedBox-image"
          />
        </div>

        <div className="productCustomization-specs">
          {colorsAvailable && 
          <div className="productCustomization-specs-availableColors">
            <p className="small-text">Available Colors</p>
            <div className="productCustomization-specs-colors">
              {colorsAvailable.map((item: string) =>{
                const customColors = [
                  {name: 'spacegray', hex: '#110022'},
                  {name: 'rosegold', hex: '#B76E79'},
                  {name: 'midnightgreen', hex: '#004953'},
                ];
                const customColor = customColors.find(i => i.name === item);
                return <div 
                  key={item} 
                  className={`productCustomization-specs-colors-colorBox productCustomization-specs-colors-colorBox--${selectedColor === item ? 'active' : ''}`}
                  onClick={()=>onSelectedColor(item)}
                >
                  <div 
                    className="productCustomization-specs-colors-colorBox-color" 
                    style={{background: customColor ? customColor.hex : item}}
                  />
                </div>;
              })}
            </div>
            
          </div>}

          {colorsAvailable && <hr className="divider colors-divider"/>}

          {capacityAvailable &&
          <div className="productCustomization-specs-capacitySelection">
            <p className="small-text">Select Capacity</p>
            <div className="productCustomization-specs-capacitySelection-options">
              {capacityAvailable.map((item: string) => 
                <button 
                  key={item} 
                  type="button"
                  className={`productCustomization-specs-capacitySelection-options-option productCustomization-specs-capacitySelection-options-option--${selectedCapacity === item ? 'active' : ''}`}
                  onClick={() => onSelectedCapacity(item)}
                >
                  {item}
                </button>
              )}
            </div>
          </div>
          }

          {colorsAvailable && <hr className="divider capacity-divider"/>}

          <div className="productCustomization-specs-priceBox">
            <h2>${priceRegular}</h2>
            {priceDiscount !== priceRegular && 
              <p className="productCustomization-specs-priceBox-priceDiscount">${priceDiscount}</p>
            } 
          </div>

          <div className="productCustomization-specs-actionButtons">
            <button 
              type="button" 
              className="productCustomization-specs-actionButtons-addToCart"
              onClick={() => addToCart({image: images[0], price: priceDiscount, name})}
            >
              Add to cart
            </button>

            <button type="button" className="productCustomization-specs-actionButtons-like">
              <img src={Heart} alt="like" className="imageLink"/>
            </button>
          </div>

          <div className="productCustomization-specs-techs small-text">
            <Tech label="Screen" value={screen} />
            <Tech label="Resolution" value={resolution} />
            <Tech label="Processor" value={processor} />
            <Tech label="RAM" value={ram} />
          </div>

        </div>
      </div>

      <div className="description">
        <div className="description-aboutBox">
          <h3>About</h3>
          <div className="divider descriptionDivider" />
          {description.map((item: {title: string, text: string[]}, index: number) => 
            <div key={index} className="description-aboutBox-section">
              {(description.length > 1 && item) && 
                <>
                  <h4 className="description-aboutBox-section-title">{item.title}</h4>
                  {item.text.map((paragraph : string, index: number) => 
                    <p key={index} className="description-aboutBox-section-text body-text">
                      {paragraph}
                    </p>
                  )}  
                </>}

              {description.length === 1 &&
                    <p key={index} className="description-aboutBox-section-text body-text">
                      {item.text}
                    </p>
              }
            </div>
          )}
        </div>

        <div className="description-techSpecsBox">
          <h3>Tech specs</h3>
          <div className="divider descriptionDivider" />
          <div className="description-techSpecsBox-items body-text">
            <Tech label="Screen" value={screen} />
            <Tech label="Resolution" value={resolution} />
            <Tech label="Processor" value={processor} />
            <Tech label="RAM" value={ram} />
            {capacity && <Tech label="Built in memory" value={capacity} />}
            {camera && <Tech label="Camera" value={camera} />}
            {zoom && <Tech label="Zoom" value={zoom} />}
            {cell.length > 0 && <Tech label="Cell" value={cell.join(', ')} />}
          </div>
        </div>
      </div>

      <ProductsSlider 
        data={suggestedProducts.data}
        title="You may also like"
        isLoading={suggestedProducts.isLoading}
        isError={suggestedProducts.isError}
      />
    </>
  );
};

export default ProductDetailsPage;
