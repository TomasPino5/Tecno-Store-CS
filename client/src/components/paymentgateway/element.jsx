import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";  

const CheckoutForm = ({}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [mensaje, setMensaje] = useState("");

  const totalPrice = useSelector((state) => state.totalPrice);


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
          producto: { nombre: "Auriculares", precio: totalPrice }, // Cambiar según tus productos
          cantidad: 1, // Cambiar según la cantidad
          token: token,
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);
    }
  };

  return (
    <div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "400px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Pasarela de Pago
          </h2>
          <div style={{ marginBottom: "20px" }}>
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Pagar
          </button>
          {mensaje && (
            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: mensaje.startsWith("Error") ? "red" : "green",
              }}
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
