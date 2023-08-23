import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./favorites.module.css";
import { NavLink } from "react-router-dom";
import { removeFromFavorite, getUserFavs } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const Favorites = () => {

  const dispatch = useDispatch();
  const { user } = useAuth0();
  const email = user?.email

  useEffect(() => {
    dispatch(getUserFavs(email));
  }, [dispatch, email]);

  const favorites = useSelector((state) => state.favorites);
  const prod = favorites.flat()
  const prodFav = prod.map(p=> p.products)
  //console.log(prodFav.flat())
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}
  const formatPriceWithDots = (price) => {
    return price.toLocaleString();
  };

  const handleFavorite = (id) => {
    Swal.fire({
      title: "Desea eliminar su producto de favoritos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si estoy seguro",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ff0000",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromFavorite(email, id));
      }
    });
  }



  return (
    <div>
      <h2>Favorites</h2>
      <h1>💚</h1>
      {favorites.length === 0 ? <h1 className={style.vacio}>Agregue productos a favoritos...</h1> : null}
      <div className={style.divisor}>
        
        {prodFav.flat().map((product) => (
          <div
            key={product.id}
            style={{ textDecoration: "none", color: "inherit" }}
            className={darkMode ? style.carddarkMode : style.card}
          >
            <button
              className={style.botonFav}
              onClick={
                (e) => {
                  e.stopPropagation();
                  handleFavorite(product.id)
                }
              }
            >
              {"💚"}
            </button>

            <NavLink to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className={
                  darkMode ? style.img_containerdarkMode : style.img_container
                }
              >
                <img
                  className={style.card__img}
                  src={product.imageSrc}
                  alt={product.imageAlt}
                />
              </div>
              <div className={style.container_name}>
                <h3 className={darkMode ? style.htdarkMode : style.ht}>
                  {product.name}
                </h3>
              </div>
              <div className={style.container_data}>
                <p className={darkMode ? style.pricedarkMode : style.price}>
                  ${formatPriceWithDots(product.price)}
                </p>
                <p className={style.texts}>{product.brand}</p>
                <p className={style.texts}>{product.category}</p>
              </div>
              <p className={style.stock}>Ver Detalle</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

// div className={darkMode ? style.carddarkMode : style.card}>
//       <div
//         className={
//           darkMode ? style.img_containerdarkMode : style.img_container
//         }
//       >
//         <img className={style.card__img} src={imageSrc} alt={imageAlt} />
//       </div>
//       <NavLink
//         to={`/product/${id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <div className={style.container_name}>
//           <p className={darkMode ? style.htdarkMode : style.ht}>{name}</p>
//         </div>
//         <div className={style.container_data}>
//           <span className={darkMode ? style.pricedarkMode : style.price}>
//             ${formatPriceWithDots(price)}
//           </span>
//           <p className={style.texts}>{brand}</p>
//           <p className={style.texts}>{category}</p>
//         </div>
//         <p className={style.stock}>Stock disponible {stock}</p>

//       </NavLink>
//     </div >
