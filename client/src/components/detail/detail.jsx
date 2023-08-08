import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearDetail } from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";
import style from "./detail.module.css";

const Detail = () => {
  //HOOKS
  const myProduct = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  //STATE
  let [loading, setLoading] = React.useState(false);
  const [cartQuantity, setCartQuantity] = React.useState(1); // Estado para la cantidad en el carrito

  function decrementCartQuantity() {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  }

  function incrementCartQuantity() {
    if (cartQuantity < myProduct.stock) {
      setCartQuantity(cartQuantity + 1);
    }
  }
  function buyNow() {
    const totalQuantity = cartQuantity; // Obtén la cantidad actual del carrito
    alert(`¡Compraste ${totalQuantity} unidades!`);
    // Aquí podrías agregar lógica adicional relacionada con la compra ahora
  }

  //useEffect
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
    dispatch(getProductDetails(id));
    //cuando se desmonta
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);
  const { price } = myProduct;
  const formatPriceWithDots = (price) => {
    return price.toLocaleString();
  };

  return (
    <div className={style.detail}>
      {!loading ? (
        <>
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
                {price
                  ? `$${formatPriceWithDots(price)}`
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
                <p className={style.N__Sp}>
                  Almacenados y enviado por nosotros
                </p>
                <p className={style.N__ST}>Stock: {myProduct?.stock}</p>
              </div>
              <div className={style.cart__controls}>
                <button
                  className={style.decrement__button}
                  onClick={decrementCartQuantity}
                >
                  -
                </button>
                {cartQuantity}
                <button
                  className={style.increment__button}
                  onClick={incrementCartQuantity}
                >
                  +
                </button>
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
                  Description {myProduct?.description}
                </p>
              </div>
              <div className={style.btn__c}>
                <div
                  data-tooltip={`$${myProduct?.price}`}
                  className={style.button}
                >
                  <div className={style.button_wrapper}>
                    <button className={style.buy__button} onClick={buyNow}>
                      <div className={style.text}>Buy Now</div>
                      <span className={style.icon}>
                        <svg
                          viewBox="0 0 16 16"
                          className={style.bi_cart2}
                          fill="currentColor"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* ... (código del ícono) */}
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/products">
            <button className={style.btnReturn} id="buttonReturn">Return</button>
          </Link>

      
          {/* <div className={style.btn__pro}>
            <NavLink to={`/product/${id - 1}`}> back</NavLink>
            <NavLink to={`/product/${parseInt(id) + 1}`}> next</NavLink>
          </div> */}
        </>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Detail;
