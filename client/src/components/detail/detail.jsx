import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  addToCart,
  productRatings,
} from "../../redux/actions";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Loading from "../../components/Loading/Loading.jsx";
import style from "./detail.module.css";

import { useAuth0 } from "@auth0/auth0-react"; // Asegúrate de importar useAuth0

import StarRating from "../starRating/starRating";

const Detail = () => {
  const myProduct = useSelector((state) => state.productDetail);
  console.log(myProduct);
  // const items = useSelector((state) => state.items)
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(productRatings(id));
  }, [dispatch, id]);

  const ratings = useSelector((state) => state.productRatings);
  console.log(ratings);

  // STATE
  const [loading, setLoading] = useState(false);

  // Estado de autenticación
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkmode : style.lightMode}
  // const [cartQuantity, setCartQuantity] = useState(1); // Estado para la cantidad en el carrito

  // function decrementCartQuantity() {
  //   if (cartQuantity > 1) {
  //     setCartQuantity(cartQuantity - 1);
  //   }
  // }

  // function incrementCartQuantity() {
  //   if (cartQuantity < myProduct.stock) {
  //     setCartQuantity(cartQuantity + 1);
  //   }
  // }

  // const stripe = useStripe();
  // const elements = useElements();
  // const [mensaje, setMensaje] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const { token, error } = await stripe.createToken(
  //     elements.getElement(CardElement)
  //   );

  //   if (error) {
  //     setMensaje(`Error: ${error.message}`);
  //   } else {
  //     // Enviar el token al backend para realizar el pago
  //     const response = await fetch("http://localhost:3004/pago", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         producto: { nombre: myProduct.name, precio: myProduct.price }, // Cambiar según tus productos
  //         cantidad: 1, // Cambiar según la cantidad
  //         token: token,
  //       }),
  //     });

  //     const data = await response.json();
  //     setMensaje(data.mensaje);
  //   }
  // };

  function handleBuyNow(event) {
    dispatch(addToCart(myProduct));
    Swal.fire({
      title: "Agregado",
      text: "¡Producto añadido al carrito!",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#28a745",
    });
    event.preventDefault();
  }

  const handleBuy = (event) => {
    Swal.fire({
      title: "Inicie sesión",
      text: "Por favor inicia sesión para comprar.",
      icon: "warning",
      confirmButtonText: "Iniciar sesión",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      if (result.isConfirmed) {
        loginWithRedirect();
      }
    });
    event.preventDefault();
  };

  // function buyNow(event) {
  //   dispatch(getProductDetails())
  //   event.preventDefault()
  // }

  //useEffect

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
    dispatch(getProductDetails(id));

    // return () => {
    //   dispatch(clearDetail());
    // };
  }, [dispatch, id]);

  // RENDER
  return (
    <form className={style.detail}>
      {!loading ? (
        <div
          className={
            darkMode ? style.detailContainerdarkmode : style.detailContainer
          }
        >
          <div className={darkMode ? style.img__cdarkmode : style.img__c}>
            <img
              className={style.imgDetail}
              src={myProduct?.imageSrc}
              alt="img not found"
            />
            <h2>Product reviews:</h2>
            {ratings.length === 0 ? (
              <h1>Todavia no hay ninguna review</h1>
            ) : null}
            {ratings.map((r) => (
              <div className={style.rating} key={r.id}>
                <p className={style.ratingP}>{r.user}</p>
                <p className={style.ratingPN}>{r.rating}</p>
                <div className={style.star}>
                  <StarRating
                    value={r.rating} // Valor actual de calificación
                    onChange={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className={
              darkMode ? style.text__containerdarkmode : style.text__container
            }
          >
            <p className={darkMode ? style.N__pdarkmode : style.N__p}>
              Nuevo | +1000 vendidos
            </p>
            <div className={style.N__Tc}>
              {myProduct.title ? (
                <h3 className={darkMode ? style.N__tdarkmode : style.N__t}>
                  {myProduct.title}
                </h3>
              ) : (
                <h3 className={darkMode ? style.N__tdarkmode : style.N__t}>
                  {myProduct.name}
                </h3>
              )}
            </div>
            <h4 className={darkMode ? style.N__Prdarkmode : style.N__Pr}>
              Price:{" "}
              {myProduct.price
                ? `$${myProduct.price.toLocaleString()}`
                : "Price not available"}
            </h4>
            <p className={darkMode ? style.N__pdarkmode : style.N__p}>
              Ver los medios de pago
            </p>
            <div className={style.N__C}>
              <p className={darkMode ? style.ncdarkmode : style.nc}>
                Brand: {myProduct?.brand}
              </p>
              <p className={darkMode ? style.ncdarkmode : style.nc}>
                Category: {myProduct?.category}
              </p>
            </div>
            <div className={style.N__St}>
              {myProduct?.stock > 0 ? (
                <p className={darkMode ? style.N__STdarkmode : style.N__ST}>
                  Stock disponible
                </p>
              ) : (
                <p className={darkMode ? style.N__STdarkmode : style.N__ST}>
                  Stock agotado
                </p>
              )}
              <p className={darkMode ? style.N__Spdarkmode : style.N__Sp}>
                Almacenados y enviado por nosotros
              </p>
              <p className={darkMode ? style.N__STdarkmode : style.N__ST}>
                Stock: {myProduct?.stock}
              </p>
            </div>
            <div className={style.color__container}>
              <p className={darkMode ? style.N__cpdarkmode : style.N__cp}>
                Color:
              </p>
              <button className={style.btn1}></button>
              <button className={style.btn2}></button>
              <button className={style.btn3}></button>
              <button className={style.btn4}></button>
            </div>
            <div>
              <p className={darkMode ? style.N__Ddarkmode : style.N__D}>
                Description: {myProduct?.description}
              </p>
            </div>

            {myProduct?.price && (
              <div className={style.btn__c}>
                <div
                  data-tooltip={`$${myProduct.price}`}
                  className={style.button}
                >
                  <div className={style.button_wrapper}>
                    <button
                      className={style.buy__button}
                      onClick={handleBuyNow}
                    >
                      <div className={style.text}>Add to Cart</div>

                      <span onClick={handleBuyNow} className={style.icon}>
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
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className={style.cart__container}>
              {/* <CardElement /> */}
              <br />
              {isAuthenticated ? (
                <NavLink
                  to={`/pay`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button className={style.buttonYa}>Comprar</button>
                </NavLink>
              ) : (
                <button className={style.buttonYa} onClick={handleBuy}>
                  Comprar
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}

      <Link to="/products">
        <button className={style.btnReturn} id="buttonReturn">
          Return
        </button>
      </Link>
    </form>
  );
};

export default Detail;
