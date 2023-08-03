import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";
// import { useDispatch } from "react-redux";
// import { deleteProductsById } from "../../redux/actions";

export default function Card({
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
}) {
  // aca va let dispatch = useDispatch();

  // aca va const handleClose = () => { dispatch(deleteProductsById(id))}
  return (
    <div className={style.card}>
      <div className={style.img_container}>
        <img className={style.card__img} src={imageSrc} alt={imageAlt} />
      </div>
      <div className={style.container_name}>
        <p className={style.ht}>{name}</p>
      </div>
      <div className={style.container_data}>
        <span className={style.price}>${price}</span>
        <p className={style.texts}>{brand}</p>
        <p className={style.texts}>{category}</p>
      </div>
      <p className={style.stock}>Stock disponible {stock}</p>
    </div>
  );
}
