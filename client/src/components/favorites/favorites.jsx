import { useSelector } from "react-redux";
import style from "./favorites.module.css";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}
  const formatPriceWithDots = (price) => {
    return price.toLocaleString();
  };

  return (
    <div>
      <h2>Favorites</h2>
      <div className={style.divisor}>
        {favorites.map((product) => (
          <div
            className={darkMode ? style.carddarkMode : style.card}
            key={product.id}
          >
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
            <NavLink
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
              <p className={style.stock}>Stock: {product.stock}</p>
            </NavLink>
            {/* You can add more information or customize the rendering here */}
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
