import Card from "../card/card.jsx";
import axios from 'axios';

function Cards() {

  const products = [];
  console.log(products)
  return (
    <div>
      {products.map(({ id, name, href, imageSrc, imageAlt, price, stock, brand, category, description }) => (
                    <Card
                        key={id}
                        id={id}
                        name={name}
                        href={href}
                        imageSrc={imageSrc}
                        imageAlt={imageAlt}
                        price={price}
                        stock={stock}
                        brand={brand}
                        category={category}
                        description={description}
                    />
                ))}
    </div>
  );
}
export default Cards;
