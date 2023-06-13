import { Arrow, Home } from "../../assets/icons";
import { ProductsList } from "../../components";
import { useFavorites } from "../../core/ContextProviders/FavoritesContext";
import "./Favorites.scss";

const Favorites = () => {
  const { favoritesItems } = useFavorites();
  return (
    <>
      <div className="breadcrumbs">
        <img src={Home} alt="Home icon" />
        <img src={Arrow} alt="Arrow icon" className="rightArrow" />
        <p className="breadcrumbs-page">Favourites</p>
      </div>
      <div className="container">
        <h1 className="favoritesTitle">Favourites</h1>

        <p className="body-text itemsLength">{favoritesItems.length} items</p>

        {favoritesItems.length > 0 && <ProductsList data={favoritesItems} />}

        {favoritesItems.length === 0 && <h3>Your favorites is empty</h3>}
      </div>
    </>
  );
};

export default Favorites;
