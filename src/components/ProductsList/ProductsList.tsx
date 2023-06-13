/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCard } from "../";
import "./ProductsList.scss";

const ProductsList = ({ data }: { data: any }) => {
  return (
    <div className="products">
      {data.map((item: any) => {
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

        // when the array has different property names
        const imgUrl = imageUrl ? imageUrl : image;
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
