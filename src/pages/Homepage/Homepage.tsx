import "./Homepage.scss";

import { BannerSlider, CategoryBanners, ProductsSlider } from "./components";
import { useGetItems } from "../../core/api";
import { type Phone } from "../../core/types/Phone";
import { getProductsSliderData } from "./utils";

const Homepage = () => {
  const { isLoading, data, isError } = useGetItems("/phones.json", [
    "new-phones-data",
  ]) as { isLoading: boolean; data: Phone[]; isError: boolean };

  let brandNewPhones: Phone[] = [];
  let hotPricesPhones: Phone[] = [];

  if (!isLoading && !isError) {
    brandNewPhones = getProductsSliderData(data, "fullPrice");
    hotPricesPhones = getProductsSliderData(data, "price", "fullPrice");
  }

  return (
    <div className="homepage">
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <BannerSlider />

      <ProductsSlider
        data={brandNewPhones}
        title="Brand new models"
        isLoading={isLoading}
        isError={isError}
      />

      <CategoryBanners />

      <ProductsSlider
        data={hotPricesPhones}
        title="Hot prices"
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Homepage;
