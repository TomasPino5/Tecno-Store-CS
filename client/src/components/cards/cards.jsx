import Card from "../card/card.jsx";
import style from "./cards.module.css";

function Cards({ products }) {
  return (
    <div className={style.ordenador}>
      {products.map(
        ({
          id,
          name,
          href,
          imageSrc,
          imageAlt,
          price,
          stock,
          brand,
          category,
          description,
        }) => (
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
        )
      )}
    </div>
  );
}
export default Cards;
