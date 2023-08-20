import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToFavorite,
  removeFromFavorite,
} from "../../redux/actions";
import Swal from "sweetalert2";
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
  const dispatch = useDispatch();
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

  function handleBuyNow(event) {
    dispatch(
      addToCart({
        id: id,
        name: name,
        href: href,
        imageSrc: imageSrc,
        imageAlt: imageAlt,
        price: price,
        stock: stock,
        brand: brand,
        category: category,
        description: description,
      })
    );
    Swal.fire({
      title: "Agregado",
      text: "¡Producto añadido al carrito!",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#28a745",
    });
    event.preventDefault();
  }

  const handleFavorite = (product) => {
    if (isFav) {
      Swal.fire({
        title: "Desea eliminar su producto de favoritos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si estoy seguro",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#008000",
        confirmButtonColor: "#ff0000",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsFav(false);
          dispatch(removeFromFavorite(product.id));
        }
      });
    } else {
      Swal.fire({
        title: "¡Producto añadido a favoritos!",
        icon: "success",
        confirmButtonText: "ok",
        confirmButtonColor: "#28a745",
      });
      setIsFav(true);
      dispatch(addToFavorite(product));
    }
  };

  const formatPriceWithDots = (price) => {
    return price.toLocaleString();
  };
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}

  return (
    <div className={darkMode ? style.carddarkMode : style.card}>
      <div
        className={darkMode ? style.img_containerdarkMode : style.img_container}
      >
        <button
          className={style.botonFav}
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite({
              id,
              name,
              imageSrc,
              imageAlt,
              price,
              stock,
              brand,
              category,
            });
          }}
        >
          {isFav ? "💚" : "🤍"}
        </button>
        <button className={style.botonAddCart} onClick={handleBuyNow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
          </svg>
        </button>
        <NavLink
          to={`/product/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img className={style.card__img} src={imageSrc} alt={imageAlt} />
          <div className={style.container_name}>
            <p className={darkMode ? style.htdarkMode : style.ht}>{name}</p>
          </div>
          <div className={style.container_data}>
            <span className={darkMode ? style.pricedarkMode : style.price}>
              ${formatPriceWithDots(price)}
            </span>
            <p className={style.texts}>{brand}</p>
            <p className={style.texts}>{category}</p>
          </div>
          <p className={style.stock}>Stock disponible {stock}</p>
        </NavLink>
      </div>
    </div>
  );
}
