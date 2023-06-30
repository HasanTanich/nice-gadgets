import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type FavoritesContextType } from "../types/Favorites";
import { type ProductsListItem } from "../types/ProductsListItem";

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const SavedFavoritesData = localStorage.getItem("favorites");
  const [favoritesItems, setFavoritesItems] = useState<Array<ProductsListItem>>(
    SavedFavoritesData == null
      ? []
      : (JSON.parse(SavedFavoritesData) as ProductsListItem[])
  );

  const addToFavorites = (product: ProductsListItem) => {
    setFavoritesItems([...favoritesItems, product]);
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavoritesItems = favoritesItems.filter((item) => {
      return item.id !== id;
    });
    setFavoritesItems(updatedFavoritesItems);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesItems));
  }, [favoritesItems]);

  return (
    <FavoritesContext.Provider
      value={{ favoritesItems, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

export const useFavorites = () => {
  return React.useContext(FavoritesContext) as FavoritesContextType;
};
