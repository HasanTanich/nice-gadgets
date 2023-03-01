export interface Phone {
  id: number;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
