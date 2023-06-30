import { useFetchDataFromMultipleUrls, useGetItems } from "../../core/api";
import { getProductsFromType } from "../../core/dataUtils";
import { type Phone } from "../../core/types/Phone";
import { type Product } from "../../core/types/Product";

type ProductData = {
  isLoading: boolean;
  isError: boolean;
  data: (Phone | Product)[];
  productDetailsFetchUrl: string;
};

export function GetProductData(
  product: string | undefined,
  productType: string,
  id: string | undefined,
  searchQuery: string | null
): ProductData {
  let productDetailsFetchUrl = "";

  const {
    data: multipleQueries,
    isLoading: isLoadingNewApi,
    isError: isErrorNewApi,
  } = useFetchDataFromMultipleUrls(
    ["phones-data"],
    ["old-phones-data"],
    "/phones.json",
    "/old-api/products.json",
    product === "phones"
  );

  const {
    data: singleQuery,
    isLoading: isLoadingOldApi,
    isError: isErrorOldApi,
  } = useGetItems(
    "/old-api/products.json",
    [`old-${product || ""}-data"`],
    product !== "phones"
  ) as { data: Product[]; isLoading: boolean; isError: boolean };

  if (product === "phones" && multipleQueries) {
    const phonesFromNewApi = multipleQueries.newData;
    const productsFromOldApi = multipleQueries.oldData;
    const phonesFromOldApi = getProductsFromType(
      productsFromOldApi,
      productType
    );
    let data = [...phonesFromNewApi, ...phonesFromOldApi];
    if (id) {
      // check if id is from old api
      if (productsFromOldApi.find((item) => item.id === id)) {
        productDetailsFetchUrl = "/old-api/products/" + id + ".json";
      } else {
        productDetailsFetchUrl = "/phones/" + id + ".json";
      }
    }
    if (searchQuery) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return {
      isLoading: isLoadingNewApi,
      isError: isErrorNewApi,
      data,
      productDetailsFetchUrl: productDetailsFetchUrl,
    };
  } else if (product !== "phones" && singleQuery) {
    let data = getProductsFromType(singleQuery, productType);
    if (searchQuery) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    productDetailsFetchUrl = `/old-api/products/${id || ""}.json`;
    return {
      isLoading: isLoadingOldApi,
      isError: isErrorOldApi,
      data,
      productDetailsFetchUrl,
    };
  }
  return {
    isLoading: true,
    isError: false,
    data: [],
    productDetailsFetchUrl: "",
  };
}
