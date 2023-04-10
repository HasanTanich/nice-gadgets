import { QueryKey, useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://hasantanich.github.io/my-json-data/nice-gadgets/api';

export function useGetItems(url: string, key: QueryKey) {
  return useQuery(key, async () => {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  });
}

export function useFetchDataFromMultipleUrls (key1: QueryKey, key2: QueryKey, url1: string, url2: string) {
  return useQuery([key1, key2], async () => {
    const [response1, response2] = await Promise.all([fetch(BASE_URL + url1), fetch(BASE_URL + url2)]);
    if(!response1.ok || !response2.ok){
      throw new Error('Failed to fetch data');
    }
    const data1 = await response1.json();
    const data2 = await response2.json();
    return [data1, data2];
  });
}