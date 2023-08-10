import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
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
          producto: { nombre: "Auriculares", precio: 29.99 }, // Cambiar según tus productos
          cantidad: 1, // Cambiar según la cantidad
          token: token,
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "100px 100px 100px 100px" }}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default CheckoutForm;
