import "./cart.css";
import { ClearCartIcon, CartIcon } from "./icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  clearDetail,
} from "../../redux/actions";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert
import { useAuth0 } from "@auth0/auth0-react"; // Asegúrate de importar useAuth0

export default function Cart() {
  const items = useSelector((state) => state.items);
  const totalPrice = useSelector((state) => state.totalPrice);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const clearCartHandler = () => {
    if (items.length > 0) {
      Swal.fire({
        title: "Esta Seguro",
        text: "!se eliminaran todos los productos de su carrito¡",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si estoy seguro",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearCart(items));
        }
      });
    }
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
        cancelButtonColor: "#3085d6",
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

  const clearDetailHandler = () => {
    if (isAuthenticated) {
      dispatch(clearDetail());
    } else {
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
    }
  };

  function CartItem({ id, imageSrc, imageAlt, price, name, quantity }) {
    return (
      <li className={items.length > 1 ? "list2" : "list"}>
        <div className="img-container">
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className="name">
          <strong>{name}</strong>
          <p className="precio">
            ${price.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <footer className="footer">
          <button
            className="rest"
            onClick={() =>
              removeFromCartHandler({
                id,
                imageSrc,
                imageAlt,
                price,
                name,
                quantity,
              })
            }
          >
            <span className="minus">-</span>
          </button>
          <small className="small">Cant. {quantity}</small>
          <button
            className="add"
            onClick={() =>
              addToCartHandler({
                id,
                imageSrc,
                imageAlt,
                price,
                name,
                quantity,
              })
            }
          >
            <span className="plus">+</span>
          </button>
        </footer>
      </li>
    );
  }

  return (
    <>
      <label className="cart-button" htmlFor="carritoDeCompras">
        <CartIcon />
      </label>
      <input id="carritoDeCompras" type="checkbox" hidden />
      <aside className="cart">
        <ul className="carts">
          {items.map((product) => (
            <CartItem
              key={product.id}
              value={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <div className="result-container">
          <div className="TOTAL">
            Total: $
            {totalPrice.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
          </div>
          {items.length > 0 ? (
            isAuthenticated ? (
              <NavLink
                to={`/pay`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button onClick={clearDetailHandler} className="BUY">
                  Buy
                </button>
              </NavLink>
            ) : (
              <button onClick={clearDetailHandler} className="BUY">
                Buy
              </button>
            )
          ) : (
            <button
              onClick={() =>
                Swal.fire({
                  title: "¡El carrito esta vacio!",
                  text: "Por favor agregue un producto al carrito",
                  icon: "warning",
                  confirmButtonText: "ok",
                  confirmButtonColor: "#28a745",
                })
              }
              className="BUY"
            >
              Buy
            </button>
          )}
          <button className="CLEAR" onClick={clearCartHandler}>
            {" "}
            <ClearCartIcon />{" "}
          </button>
        </div>
      </aside>
    </>
  );
}
