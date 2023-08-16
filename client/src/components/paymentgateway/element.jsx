import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  clearDetail,
  addToCart,
  removeFromCart,
  incrementSales,
  postUserPurchase,
} from "../../redux/actions";
import styles from "./element.module.css";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import style from "./element.module.css";

const CheckoutForm = () => {
  const { user } = useAuth0();
  const dataUser = useSelector((state) => state.user);

  const stripe = useStripe();
  const elements = useElements();
  const [mensaje, setMensaje] = useState("");

  let navigate = useNavigate();

  const totalPrice = useSelector((state) => state.totalPrice);
  const items = useSelector((state) => state.items);
  const detail = useSelector((state) => state.productDetail);

  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkmode : style.lightMode}

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch]);

  const calculateTotalPrice = () => {
    let total = 0;

    if (totalPrice > 0) {
      total += totalPrice;
    }

    if (detail && detail.price) {
      total += detail.price;
    }

    return total;
  };

  const calculateQuantity = () => {
    let totalQuantity = 0;
    if (detail && detail.name) {
      totalQuantity++; // If detail has a product, add 1 to the total quantity
    }
    if (items.length > 0) {
      totalQuantity += items.reduce((total, item) => total + item.quantity, 0);
    }
    return totalQuantity;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const calculatedTotalPrice = calculateTotalPrice();
    const calculatedQuantity = calculateQuantity();

    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      // Enviar el token al backend para realizar el pago
      const response = await axios.post("http://localhost:3001/pago", {
        producto: { nombre: "producto(s)", precio: calculatedTotalPrice },
        cantidad: calculatedQuantity,
        token: token,
      });

      const data = response.data;
      setMensaje(data.mensaje);

      console.log(data.mensaje);
      if (data.mensaje === "Pago exitoso") {
        dispatch(incrementSales());
        enviarCorreo();
      }

      if (data.mensaje === "Pago exitoso") {
        dispatch(postUserPurchase({ user: user.email, products: products }));
      }

      // Retrasar la redirección durante 3 segundos
      if (data.mensaje === "Pago exitoso") {
        setTimeout(() => {
          navigate("/products");
        }, 1000);
        alert(
          "Su compra ha sido procesada con exito, le llegara un mail con informacion de la misma"
        );
        dispatch(clearCart(items));
      }
    }
  };

  const products = items.length === 0 ? [detail] : items.map((i) => i);

  //const productCartPicture = items.map((item) => (item.imageSrc))
  const productCartName = items.map((item) => item.name);
  const productCartQuantity = items.map((item) => item.quantity);
  const productCartBrand = items.map((item) => item.brand);
  const productCartPrice = items.map((item) =>
    item.price.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
    })
  );

  //const productDetailPicture = detail.imageSrc
  const productDetailName = detail.name;
  const productDetailQuantity = "1";
  const productDetailBrand = detail.brand;
  const productDetailPrice = detail?.price;
  const quantityDeDetail = 1;

  //const productPicture = productCartPicture.length === 0 ? productDetailPicture : productCartPicture
  const productName =
    productCartName.length === 0 ? productDetailName : productCartName;
  const productQuantity =
    productCartQuantity.length === 0
      ? productDetailQuantity
      : productCartQuantity;
  const productBrand =
    productCartBrand.length === 0 ? productDetailBrand : productCartBrand;
  const productPrice =
    productCartPrice.length === 0 ? productDetailPrice : productCartPrice;

  const enviarCorreo = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-email", {
        destinatario: user.email,
        asunto: "Compra Exitosa",
        mensaje: `Hola ${dataUser?.name ? dataUser?.name : user.name}!
            Tu compra de ${productName} fue exitosa, estaremos realizando tu envio en los proximos dias.
            Cantidad:${productQuantity}
            Marca: ${productBrand} 
            Precio: $${productPrice}`,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar el correo electrónico", error);
    }
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product));
  };

  // const addToDetailHandler = () => {
  //   dispatch(addToDetail(detail))
  // }

  // const removeFromDetailHandler = () => {
  //   dispatch(removeFromDetail(detail));
  // }

  return (
    // los estilos se los dejamos a alguien que sepa (guiño guiño seba)
    <>
      <div className={styles.div0}>
        {items.map((item) => (
          <div className={styles.item} key={item.id}>
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <p className={styles.itemName}>{item.name}</p>
              <p>
                Cantidad: {item.quantity}
                <button onClick={() => addToCartHandler(item)}>+</button>
                <button onClick={() => removeFromCartHandler(item)}>-</button>
              </p>
              <p>Marca: {item.brand}</p>
              <p>Categoría: {item.category}</p>
              <p className={styles.itemPrice}>
                Precio: $
                {item.price.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}
        {Object.keys(detail).length !== 0 && (
          <div className={styles.item} key={detail.id}>
            <img
              src={detail.imageSrc}
              alt={detail.imageAlt}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <p className={styles.itemName}>{detail.name}</p>
              <p>Cantidad: {quantityDeDetail}</p>
              {/* <button onClick={addToDetailHandler}>+</button><button onClick={removeFromDetailHandler}>-</button> */}
              <p>Marca: {detail.brand}</p>
              <p>Categoría: {detail.category}</p>
              <p className={styles.itemPrice}>
                Precio: $
                {detail.price.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit}
          className={darkMode ? style.formdarkMode : styles.form}
        >
          <h2 className={darkMode ? style.titledarkMode : styles.title}>
            Resumen de compra
          </h2>

          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  <strong>{item.name}</strong> - x{item.quantity} - $
                  {item.price.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </li>
            ))}
            {detail && Object.keys(detail).length !== 0 && (
              <li>
                <span>
                  <strong>{detail.name}</strong> - x1 - $
                  {detail.price.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </li>
            )}
          </ul>
          <p>
            <strong>Total:</strong> $
            {calculateTotalPrice().toLocaleString("es-ES", {
              minimumFractionDigits: 2,
            })}
          </p>

          <div className={styles.cardElementContainer}>
            <CardElement className={styles.cardElement} />
          </div>
          <button type="submit" disabled={!stripe} className={styles.payButton}>
            Pagar
          </button>
          {mensaje && (
            <p
              className={`${styles.message} ${
                mensaje.startsWith("Error")
                  ? styles.errorMessage
                  : styles.successMessage
              }`}
            >
              {mensaje}
            </p>
          )}
        </form>
        <Link to="/products">
          <button className={style.btnReturn} id="buttonReturn">
            Cancelar
          </button>
        </Link>
      </div>
    </>
  );
};

export default CheckoutForm;
