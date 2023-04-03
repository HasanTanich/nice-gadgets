import './CategoryBanners.scss';
import { useNavigate } from 'react-router-dom';

import { getItems } from '../../../../core/api';
import { getProductPageData } from '../../../../core/hooks';
import { mobilePhones, tablets, accessories} from '../../../../assets/img/category-banners';

const CategoryBanners = () => {
  const navigate = useNavigate();
  const productData = getItems('/old-api/products.json', ['categories-old-phones-data']).data;
  const phoneData = getItems('/phones.json', ['categories-new-phones-data']).data;

  let mobilePhonesLength = 0;
  let tabletsLength = 0;
  let accessoriesLength = 0;
  if(productData){
    mobilePhonesLength = getProductPageData(productData, 'type', 'phone').length;
    tabletsLength = getProductPageData(productData, 'type', 'tablet').length;
    accessoriesLength = getProductPageData(productData, 'type', 'accessory').length;
  }
  if(phoneData){
    mobilePhonesLength += phoneData.length;
  }

  const categoryBanners = [
    {title: 'Mobile phones', image: mobilePhones, models: mobilePhonesLength, path: '/phones',},
    {title: 'Tablets', image: tablets, models: tabletsLength, path: '/tablets'},
    {title: 'Accessories', image: accessories, models: accessoriesLength, path: '/accessories'},
  ];

  return (
    <div className="categoryBanners">
      <h2 className="categoryBanners-title">Shop by category</h2>
      <div className="categoryBanners-bannersBox">

        {categoryBanners.map(item => (
          <div key={item.title} className="categoryBanners-bannersBox-banner">
            <img
              src={item.image} 
              alt="mobile phones category banner" 
              className="categoryBanners-bannersBox-bannerImg imageLink"
              onClick={() => navigate(item.path)}
            />
            <h4 className="categoryBanners-bannersBox-title">{item.title}</h4>
            <p className="categoryBanners-bannersBox-models">{item.models + ' models'}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryBanners;
