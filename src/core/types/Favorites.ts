import { type ProductsListItem } from "./ProductsListItem";

export type FavoritesContextType = {
  addToFavorites: (item: ProductsListItem) => void;
  removeFromFavorites: (id: string) => void;
  favoritesItems: Array<ProductsListItem>;
};
