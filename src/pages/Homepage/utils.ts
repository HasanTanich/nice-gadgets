import { sortData } from "../../core/dataUtils";
import { type Phone } from "../../core/types/Phone";

export function getProductsSliderData(
  data: Phone[],
  filterKey1: keyof Phone,
  filterKey2?: keyof Phone
) {
  let filteredData = data.slice();
  filteredData = filteredData.filter((item) => {
    if (filterKey1 === "fullPrice") {
      // filter items if they have no discounts (fullPrice === price)
      return item.fullPrice === item.price;
    } else {
      // filter items if they have discounts (fullPrice !== price)
      return item.fullPrice !== item.price;
    }
  });
  return sortData(filteredData, filterKey1, filterKey2);
}
