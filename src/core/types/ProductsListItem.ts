export interface ProductsListItem {
    id: string;
    name: string;
    fullPrice: number;
    price: number;
    screen: string;
    capacity: string;
    ram: string;
    image: string;
    discount?: number;
    imageUrl?: string;
    itemId?: string;
}