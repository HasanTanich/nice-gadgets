import { useGetItems } from "./api";
import { type Phone } from "./types/Phone";
import { type Product } from "./types/Product";

export function sortData<T>(
  data: T[],
  sortKey: keyof T,
  sortKey2?: keyof T,
  desc = false
): T[] {
  // Sort by most expensive if sortKey = 'fullprice' and by cheapest if sortKey = 'price'
  if (
    sortKey === "alphabatically" ||
    sortKey === "fullPrice" ||
    sortKey === "age"
  ) {
    desc = true;
  }

  return data.sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];
    if ((a as Phone).year && sortKey === "age") {
      // if item is of type Phone, we change sortKey value to 'year', instead of 'age'
      const newPhoneSortKey = "year" as keyof T;
      aValue = a[newPhoneSortKey];
    }
    if ((b as Phone).year && sortKey === "age") {
      const newPhoneSortKey = "year" as keyof T;
      bValue = b[newPhoneSortKey];
    }

    if (sortKey2) {
      // sort items with the highest discount, sortKey = price, sortKey2=fullPrice
      const aDiscount = (aValue as number) - (a[sortKey2] as number);
      const bDiscount = (bValue as number) - (b[sortKey2] as number);
      return bDiscount < aDiscount ? 1 : -1;
    } else {
      if (desc) {
        return aValue < bValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    }
  });
}

export function getProductsFromType(
  data: Product[],
  filterValue: Product[keyof Product]
): Product[] {
  let filteredData = data.slice();

  filteredData = filteredData.filter((item) => {
    return item.type === filterValue;
  });

  return filteredData;
}

export function useGetSuggestedProducts(url: string, key: string) {
  const { data, isError, isLoading } = useGetItems(url, [key]) as {
    data: Phone[];
    isError: boolean;
    isLoading: boolean;
  };
  return { data, isError, isLoading };
}
