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
  postNewStock,
  deleteCartPay
} from "../../redux/actions";
import styles from "./element.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import emailjs from "@emailjs/browser";
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
      const response = await axios.post("/pago", {
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
        if (items.length === 0) {
          dispatch(postNewStock({ productId: detail.id, quantity: "1" }));
        } else {
          for (const item of products) {
            dispatch(
              postNewStock({ productId: item.id, quantity: item.quantity })
            );
          }
        }
      }

      // Retrasar la redirección durante 3 segundos
      if (data.mensaje === "Pago exitoso") {
        setTimeout(() => {
          navigate("/products");
        }, 3000);
        Swal.fire({
          title:
            "Su compra ha sido procesada con exito, le llegara un mail con informacion de la misma",
          icon: "success",
        });
        dispatch(clearCart(items));
      }
    }
  };

  const productsItem = items.map((i) => i);

  let products = [];

  if (items.length === 0) products = [detail];
  else if (detail.name === undefined) products = productsItem.flat();
  else products = productsItem.concat([detail]);

  //console.log(products)

  const p = products.map(
    (p) =>
      ` ${p.quantity ? p.quantity : "1"} ${
        p.name
      } por ${p.price?.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
      })}$`
  );
  const total = calculateTotalPrice().toLocaleString("es-ES", {
    minimumFractionDigits: 2,
  });
  const p2 = p.toString();

  const quantityDeDetail = 1;

  const enviarCorreo = () => {
    try {
      emailjs.send(
        "service_l56v90i",
        "template_04lcr08",
        {
          user_name: dataUser?.name ? dataUser?.name : user.name,
          from_name: "Tecno-Store",
          mensaje: `Hola ${dataUser?.name ? dataUser?.name : user.name}! 
      Tu compra de ${p2}, por un total de ${total}$ fue exitosa, estaremos realizando tu envio en los proximos dias.`,
          user_email: user.email,
        },
        "9kbwr2X6xsrF-k49R"
      );
    } catch (error) {
      console.error("Error al enviar el correo electrónico", error);
    }
  };

  const addToCartHandler = (product) => {
    if (product.quantity + 1 > product.stock) {
      Swal.fire({
        title: "Usted alcanzó la cantidad de stock maxima para este producto",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#808080",
      })
      return;
    }
    dispatch(addToCart(product));
  };

  const removeFromCartHandler = (product) => {
    if (product.quantity === 1) {
      // Mostrar el SweetAlert para confirmar la eliminación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "El producto se eliminará del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeFromCart(product));
        }
      });
    } else {
      // Si la cantidad es mayor a 1, elimina directamente el producto
      dispatch(removeFromCart(product));
    }
  };

  // const addToDetailHandler = () => {
  //   dispatch(addToDetail(detail))
  // }

  // const removeFromDetailHandler = () => {
  //   dispatch(removeFromDetail(detail));
  // }

  const clearDetailHandler = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto se eliminará de su lista de compras.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearDetail());
      }
    });
  };

  const deleteFromCartHandler = (product) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto se eliminará del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCartPay(product))
      }
    });
  }

  if (items.length === 0 && Object.keys(detail).length === 0) {
    navigate("/products");
  }


  return (
    // los estilos se los dejamos a alguien que sepa (guiño guiño seba)
    <>
      <div className={darkMode ? style.div0darkmode : styles.div0}>
        {items.map((item) => (
          <div
            className={darkMode ? style.itemdarkmode : styles.item}
            key={item.id}
          >
            <button
              className={styles.cerrar}
              onClick={() => deleteFromCartHandler(item)}
            >
              X
            </button>
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className={styles.itemImage}
            />
            <div
              className={
                darkMode ? style.itemDetailsdarkmode : styles.itemDetails
              }
            >
              <p className={styles.itemName}>{item.name}</p>
              <p>
                Cantidad: {item.quantity}
                <button
                  className={style.btnmas}
                  onClick={() => addToCartHandler(item)}
                >
                  +
                </button>
                <button
                  className={style.btnmas}
                  onClick={() => removeFromCartHandler(item)}
                >
                  -
                </button>
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
              <button className={styles.cerrar} onClick={clearDetailHandler}>
                X
              </button>
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
