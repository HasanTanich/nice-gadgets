import { useQuery } from 'react-query';
import axios from 'axios';

const BASE_URL = 'https://hasantanich.github.io/my-json-data/nice-gadgets/api';

export { BASE_URL };

export function getItems(url: string){
  return useQuery('phones-data', () => axios.get(BASE_URL + url));
}
