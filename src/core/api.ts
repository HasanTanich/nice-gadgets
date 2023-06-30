import { useQuery, type QueryKey } from "@tanstack/react-query";
import { type Phone } from "./types/Phone";
import { type Product } from "./types/Product";

const BASE_URL = "https://hasantanich.github.io/my-json-data/nice-gadgets/api";

export function useGetItems(url: string, key: QueryKey, enabled?: boolean) {
  return useQuery(
    key,
    async () => {
      const response = await fetch(BASE_URL + url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = (await response.json()) as unknown;
      return data;
    },
    { enabled: enabled }
  );
}

export function useFetchDataFromMultipleUrls(
  key1: QueryKey,
  key2: QueryKey,
  url1: string,
  url2: string,
  enabled?: boolean
) {
  return useQuery(
    [key1, key2],
    async () => {
      const [response1, response2] = await Promise.all([
        fetch(BASE_URL + url1),
        fetch(BASE_URL + url2),
      ]);
      if (!response1.ok || !response2.ok) {
        throw new Error("Failed to fetch data");
      }
      const newData = (await response1.json()) as Phone[];
      const oldData = (await response2.json()) as Product[];
      return { newData, oldData };
    },
    { enabled: enabled }
  );
}
