import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetailsPage.scss";

import { ArrowBlack } from "../../assets/icons";
import { useGetItems } from "../../core/api";
import { useGetSuggestedProducts } from "../../core/dataUtils";

import { Loader } from "../../components";
import { ProductsSlider } from "../Homepage/components";
import { ProductCustomization, ProductDescription } from "./components";

export interface ProductDetailsPageItem {
  name: string;
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  resolution: string;
  ram: string;
  processor: string;
  description: [
    {
      title: string;
      text: string[];
    }
  ];
  camera: string;
  zoom: string;
  cell: string[];
  capacity: string;
  color: string;
  namespaceId: string;
}

const ProductDetailsPage = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetItems(url, [
    `${productId || ""}data`,
  ]);
  const suggestedProducts = useGetSuggestedProducts("/phones.json", "phones");

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h3>Product was not found</h3>;
  }

  const {
    name,
    images,
    colorsAvailable,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    ram,
    processor,
    description,
    camera,
    zoom,
    cell,
    capacity,
    color,
    namespaceId,
  } = data as ProductDetailsPageItem;

  return (
    <>
      <div className="backBtn" onClick={() => navigate(-1)}>
        <img src={ArrowBlack} alt="Arrow icon" className="leftArrow" />
        <p className="small-text">Back</p>
      </div>

      <h2>{name}</h2>

      <ProductCustomization
        images={images}
        colorsAvailable={colorsAvailable}
        capacityAvailable={capacityAvailable}
        color={color}
        capacity={capacity}
        namespaceId={namespaceId}
        resolution={resolution}
        screen={screen}
        ram={ram}
        priceDiscount={priceDiscount}
        priceRegular={priceRegular}
        processor={processor}
        url={productId}
        name={name}
      />

      <ProductDescription
        description={description}
        resolution={resolution}
        processor={processor}
        ram={ram}
        capacity={capacity}
        camera={camera}
        zoom={zoom}
        cell={cell}
        screen={screen}
      />

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
