import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions";
import styles from "./element.module.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [mensaje, setMensaje] = useState("");

  const totalPrice = useSelector((state) => state.totalPrice);
  const items = useSelector((state) => state.items);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      // Enviar el token al backend para realizar el pago
      const response = await fetch("http://localhost:3001/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: { nombre: "producto", precio: totalPrice }, // Cambiar según tus productos
          cantidad: 1, // Cambiar según la cantidad
          token: token,
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);
    }
    dispatch(clearCart(items));
  };

  return (
    // los estilos se los dejamos a alguien que sepa (guiño guiño seba)
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
            <p>Cantidad: {item.quantity}</p>
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
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Pasarela de Pago</h2>
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
      </div>
    </div>
  );
};

export default CheckoutForm;
