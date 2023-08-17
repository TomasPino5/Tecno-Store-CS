import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../../redux/actions";
import Swal from 'sweetalert2';
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

  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (storedFavorites.some((product) => product.id === id)) {
      setIsFav(true);
    }
  }, [id]);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (product) => {
    if (isFav) {
      Swal.fire({
        title: 'Desea eliminar su producto de favoritos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si estoy seguro',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745'
      }).then((result) => {
        if (result.isConfirmed) {
          setIsFav(false)
          dispatch(removeFromFavorite(product.id))
        }
      });
    } else {
      Swal.fire({
        title: '¡Producto añadido a favoritos!',
        icon: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: '#28a745'
      })
      setIsFav(true)
      dispatch(addToFavorite(product))
    }
  }

  const formatPriceWithDots = (price) => {
    return price.toLocaleString();
  };
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}

  return (
    <div className={darkMode ? style.carddarkMode : style.card}>
      {/* <div className={style.nameContainer}>
        {isFav ? (
          <button className={style.botonFav} onClick={() => handleFavorite({ id, name, imageSrc, imageAlt, price, stock, brand, category })}>❤️</button>
        ) : (
          <button className={style.botonFav} onClick={() => handleFavorite({ id, name, imageSrc, imageAlt, price, stock, brand, category })}>🤍</button>
        )
        }
      </div> */}

      <div
        className={
          darkMode ? style.img_containerdarkMode : style.img_container
        }
      >
        <button
          className={style.botonFav}
          onClick={() =>
            handleFavorite({
              id,
              name,
              imageSrc,
              imageAlt,
              price,
              stock,
              brand,
              category,
            })
          }
        >
          {isFav ? "💚" : "🤍"}
        </button>
        <img className={style.card__img} src={imageSrc} alt={imageAlt} />

      </div>
      <NavLink
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={style.container_name}>
          <p className={darkMode ? style.htdarkMode : style.ht}>{name}</p>
        </div>
        <div className={style.container_data}>
          {/* <span className={style.price}>${price}</span> */}
          <span className={darkMode ? style.pricedarkMode : style.price}>
            ${formatPriceWithDots(price)}
          </span>
          <p className={style.texts}>{brand}</p>
          <p className={style.texts}>{category}</p>
        </div>
        <p className={style.stock}>Stock disponible {stock}</p>


      </NavLink>
    </div >
  );
}
