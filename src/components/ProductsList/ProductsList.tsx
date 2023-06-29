import { ProductCard } from "../";
import { type ProductsListItem } from "../../core/types/ProductsListItem";
import "./ProductsList.scss";

type ProductsListProps = {
  data: ProductsListItem[];
};

const ProductsList = ({ data }: ProductsListProps) => {
  return (
    <div className="products">
      {data.map((item) => {
        const {
          id,
          name,
          price,
          discount,
          screen,
          capacity,
          ram,
          imageUrl,
          image,
          itemId,
          fullPrice,
        } = item;

        // when data has different property names
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const imgUrl = imageUrl ? imageUrl : image!;
        const Id = itemId ? itemId : id;
        const itemPrice = discount ? price - discount : price;
        const itemFullPrice = fullPrice ? fullPrice : price;

        return (
          <ProductCard
            key={id}
            id={Id}
            name={name}
            price={itemPrice}
            fullPrice={itemFullPrice}
            screen={screen}
            capacity={capacity}
            ram={ram}
            image={imgUrl}
            productPage={true}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
