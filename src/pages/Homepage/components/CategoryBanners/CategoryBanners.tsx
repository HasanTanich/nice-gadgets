import './CategoryBanners.scss';

import { mobilePhones, tablets, accessories} from '../../../../assets/img/category-banners';
import { useNavigate } from 'react-router-dom';

const CategoryBanners = () => {
  const navigate = useNavigate();

  const categoryBanners = [
    {title: 'Mobile phones', image: mobilePhones, models: 95, path: '/phones'},
    {title: 'Tablets', image: tablets, models: 24, path: '/tablets'},
    {title: 'Accessories', image: accessories, models: 100, path: '/accessories'},
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
