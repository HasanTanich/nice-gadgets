import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Heart, HeartFilled } from "../../../../assets/icons";
import { useCart } from "../../../../core/ContextProviders/CartContext";
import { useFavorites } from "../../../../core/ContextProviders/FavoritesContext";
import Tech from "../Tech";
import "./ProductCustomization.scss";

type Props = {
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  color: string;
  capacity: string;
  namespaceId: string;
  resolution: string;
  processor: string;
  ram: string;
  screen: string;
  priceRegular: number;
  priceDiscount: number;
  url: string | undefined;
  name: string;
};

const ProductCustomization = ({
  images,
  colorsAvailable,
  capacity,
  color,
  capacityAvailable,
  namespaceId,
  resolution,
  processor,
  ram,
  screen,
  priceRegular,
  priceDiscount,
  url,
  name,
}: Props) => {
  const screenSize: number = useOutletContext();
  const { addToCart } = useCart();
  const { addToFavorites, favoritesItems, removeFromFavorites } =
    useFavorites();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedCapacity, setSelectedCapacity] = useState(capacity);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const isTranslateImages = useMemo(
    () =>
      imageActiveIndex > 3 &&
      imageActiveIndex !== images.length &&
      images.length > 5 &&
      screenSize < 640,
    [imageActiveIndex, screenSize]
  );
  useEffect(() => {
    setSelectedCapacity(capacity);
    setSelectedColor(color);
    setImageActiveIndex(0);
  }, [url]);

  const onSelectedColor = (color: string) => {
    if (selectedColor !== color) {
      setSelectedColor(color);
      const newUrl = `/phones/${namespaceId}-${capacity.toLowerCase()}-${color}`;
      navigate(newUrl);
    }
  };

  const onSelectedCapacity = (capacity: string) => {
    if (selectedCapacity !== capacity) {
      setSelectedCapacity(capacity);
      const newUrl = `/phones/${namespaceId}-${capacity.toLowerCase()}-${selectedColor}`;
      navigate(newUrl);
    }
  };

  const updateImageIndex = (i: number) => {
    if (imageActiveIndex !== i) {
      const imagesLength = images.length - 1;
      if (i < 0) {
        setImageActiveIndex(0);
      } else if (i > imagesLength) {
        setImageActiveIndex(imagesLength);
      } else {
        setImageActiveIndex(i);
      }
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

    if (screenSize < 640) {
      const currentX = e.changedTouches[0].clientX;
      const deltaX = currentX - startX;

      if (deltaX > 70) {
        updateImageIndex(imageActiveIndex - 1);
      } else if (deltaX < -70) {
        updateImageIndex(imageActiveIndex + 1);
      }
    }
  };

  const onLikeProduct = () => {
    if (url) {
      const image = images[0];
      if (favoritesItems.find((item) => item.id === url)) {
        removeFromFavorites(url);
      } else {
        addToFavorites({
          id: url,
          name,
          price: priceDiscount,
          fullPrice: priceRegular,
          screen,
          capacity,
          ram,
          image,
        });
      }
    }
  };

  return (
    <div className="productCustomization">
      <div
        className="productCustomization-productImages"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((item: string, index: number) => (
          <div
            key={index}
            className={`productCustomization-productImages-image productCustomization-productImages-image--${
              index === imageActiveIndex ? "active" : ""
            }`}
            onClick={() => updateImageIndex(index)}
            style={{
              transform: isTranslateImages
                ? `translateX(-${imageActiveIndex * 25}%)`
                : "",
            }}
          >
            <img src={item} alt="product image" />
          </div>
        ))}
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
        {colorsAvailable && (
          <div className="productCustomization-specs-availableColors">
            <p className="small-text">Available Colors</p>
            <div className="productCustomization-specs-colors">
              {colorsAvailable.map((item: string) => {
                const customColors = [
                  { name: "spacegray", hex: "#110022" },
                  { name: "rosegold", hex: "#B76E79" },
                  { name: "midnightgreen", hex: "#004953" },
                ];
                const customColor = customColors.find((i) => i.name === item);
                return (
                  <div
                    key={item}
                    className={`productCustomization-specs-colors-colorBox productCustomization-specs-colors-colorBox--${
                      selectedColor === item ? "active" : ""
                    }`}
                    onClick={() => onSelectedColor(item)}
                  >
                    <div
                      className="productCustomization-specs-colors-colorBox-color"
                      style={{
                        background: customColor ? customColor.hex : item,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {colorsAvailable && <hr className="divider colors-divider" />}

        {capacityAvailable && (
          <div className="productCustomization-specs-capacitySelection">
            <p className="small-text">Select Capacity</p>
            <div className="productCustomization-specs-capacitySelection-options">
              {capacityAvailable.map((item: string) => (
                <button
                  key={item}
                  type="button"
                  className={`productCustomization-specs-capacitySelection-options-option productCustomization-specs-capacitySelection-options-option--${
                    selectedCapacity === item ? "active" : ""
                  }`}
                  onClick={() => onSelectedCapacity(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {colorsAvailable && <hr className="divider capacity-divider" />}

        <div className="productCustomization-specs-priceBox">
          <h2>${priceRegular}</h2>
          {priceDiscount !== priceRegular && (
            <p className="productCustomization-specs-priceBox-priceDiscount">
              ${priceDiscount}
            </p>
          )}
        </div>

        <div className="productCustomization-specs-actionButtons">
          <button
            type="button"
            className="productCustomization-specs-actionButtons-addToCart"
            onClick={() =>
              addToCart({ image: images[0], price: priceDiscount, name: name })
            }
          >
            Add to cart
          </button>

          <button
            type="button"
            className="productCustomization-specs-actionButtons-like"
            onClick={onLikeProduct}
          >
            <img
              src={
                !favoritesItems.find((item) => item.name === name)
                  ? Heart
                  : HeartFilled
              }
              alt="like"
              className="imageLink"
            />
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
  );
};

export default ProductCustomization;
