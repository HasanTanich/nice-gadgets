import { useNavigate } from "react-router-dom";
import {
  accessories,
  mobilePhones,
  tablets,
} from "../../../../assets/img/category-banners";
import { useGetItems } from "../../../../core/api";
import { getProductsFromType } from "../../../../core/dataUtils";
import { type Phone } from "../../../../core/types/Phone";
import { type Product } from "../../../../core/types/Product";
import "./CategoryBanners.scss";

const CategoryBanners = () => {
  const navigate = useNavigate();
  const productData = useGetItems("/old-api/products.json", [
    "categories-old-phones-data",
  ]).data as Product[];
  const phoneData = useGetItems("/phones.json", ["categories-new-phones-data"])
    .data as Phone[];

  let mobilePhonesLength = 0;
  let tabletsLength = 0;
  let accessoriesLength = 0;

  if (productData) {
    mobilePhonesLength = getProductsFromType(productData, "phone").length;
    tabletsLength = getProductsFromType(productData, "tablet").length;
    accessoriesLength = getProductsFromType(productData, "accessory").length;
  }
  if (phoneData) {
    mobilePhonesLength += phoneData.length;
  }

  const categoryBanners = [
    {
      title: "Mobile phones",
      image: mobilePhones,
      models: mobilePhonesLength,
      path: "/phones",
    },
    {
      title: "Tablets",
      image: tablets,
      models: tabletsLength,
      path: "/tablets",
    },
    {
      title: "Accessories",
      image: accessories,
      models: accessoriesLength,
      path: "/accessories",
    },
  ];

  return (
    <div className="categoryBanners">
      <h2 className="categoryBanners-title">Shop by category</h2>
      <div className="categoryBanners-bannersBox">
        {categoryBanners.map((item) => (
          <div key={item.title} className="categoryBanners-bannersBox-banner">
            <img
              src={item.image}
              alt="mobile phones category banner"
              className="categoryBanners-bannersBox-bannerImg imageLink"
              onClick={() => navigate(item.path, { state: true })}
            />
            <h4 className="categoryBanners-bannersBox-title">{item.title}</h4>
            <p className="categoryBanners-bannersBox-models">{`${item.models} models`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBanners;
