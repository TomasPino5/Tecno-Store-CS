import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearDetail, addToCart } from "../../redux/actions";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Loading from "../../components/Loading/Loading.jsx";
import style from "./detail.module.css";

const Detail = () => {
  const myProduct = useSelector((state) => state.productDetail);
  // const items = useSelector((state) => state.items)
  const dispatch = useDispatch();
  const { id } = useParams();

  // STATE
  const [loading, setLoading] = useState(false);

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

  const stripe = useStripe();
  const elements = useElements();
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      // Enviar el token al backend para realizar el pago
      const response = await fetch("http://localhost:3004/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: { nombre: myProduct.name, precio: myProduct.price }, // Cambiar según tus productos
          cantidad: 1, // Cambiar según la cantidad
          token: token,
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);
    }
  };

  function buyNow() {
    dispatch(addToCart(myProduct));
    alert(`¡Producto añadido al carrito!`);
  }

  //useEffect

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
    dispatch(getProductDetails(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  // RENDER
  return (
    <form onSubmit={handleSubmit} className={style.detail}>
      {!loading ? (
        <div className={style.detailContainer}>
          <div className={style.img__c}>
            <img
              className={style.imgDetail}
              src={myProduct?.imageSrc}
              alt="img not found"
            />
          </div>
          <div className={style.text__container}>
            <p className={style.N__p}>Nuevo | +1000 vendidos</p>
            <div className={style.N__Tc}>
              {myProduct.title ? (
                <h3 className={style.N__t}>{myProduct.title}</h3>
              ) : (
                <h3 className={style.N__t}>{myProduct.name}</h3>
              )}
            </div>
            <h4 className={style.N__Pr}>
              Price:{" "}
              {myProduct.price
                ? `$${myProduct.price.toLocaleString()}`
                : "Price not available"}
            </h4>
            <p className={style.N__p}>Ver los medios de pago</p>
            <div className={style.N__C}>
              <p className={style.nc}>Brand: {myProduct?.brand}</p>
              <p className={style.nc}>Category: {myProduct?.category}</p>
            </div>
            <div className={style.N__St}>
              {myProduct?.stock > 0 ? (
                <p className={style.N__ST}>Stock disponible</p>
              ) : (
                <p className={style.N__ST}>Stock agotado</p>
              )}
              <p className={style.N__Sp}>Almacenados y enviado por nosotros</p>
              <p className={style.N__ST}>Stock: {myProduct?.stock}</p>
            </div>
            <div className={style.color__container}>
              <p className={style.N__cp}>Color:</p>
              <button className={style.btn1}></button>
              <button className={style.btn2}></button>
              <button className={style.btn3}></button>
              <button className={style.btn4}></button>
            </div>
            <div>
              <p className={style.N__D}>
                Description: {myProduct?.description}
              </p>
            </div>
            <div className={style.cart__container}>
              <CardElement />
              <br />
              <button type="submit" disabled={!stripe}>
                {" "}
                comprar ya{" "}
              </button>
              {mensaje && <p>{mensaje}</p>}
            </div>
            {myProduct?.price && (
              <div className={style.btn__c}>
                <div
                  data-tooltip={`$${myProduct.price}`}
                  className={style.button}
                >
                  <div className={style.button_wrapper}>
                    <button className={style.buy__button} onClick={buyNow}>
                      <div className={style.text}>add to car</div>
                      <span className={style.icon}>
                        <svg
                          viewBox="0 0 16 16"
                          className={style.bi_cart2}
                          fill="currentColor"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
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
