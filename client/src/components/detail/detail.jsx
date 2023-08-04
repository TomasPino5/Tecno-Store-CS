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

  return (
    <div className="Detail">
      {!loading ? (
        <>
          <div className={style.detailContainer}>
            <div className={style.img__container}>
              <img src={myProduct?.imageSrc} alt="img not found" />
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

              <h4 className={style.N__Pr}>Price: ${myProduct?.price}</h4>
              <p className={style.N__p}>Ver los medios de pago</p>
              <div className={style.N__C}>
                <p className={style.nc}>Brand: {myProduct?.brand}</p>
                <p className={style.nc}>Category: {myProduct?.category}</p>
              </div>
              <div className={style.N__St}>
                {myProduct?.stock > 0 ? (
                  <p>Stock disponible</p>
                ) : (
                  <p>Stock agotado</p>
                )}
                <p>Almacenados y enviado por nosotros</p>
                <h4>Stock: {myProduct?.stock}</h4>
              </div>
              <div className={style.color__container}>
                <p>Color:</p>
                <button className={style.btn1}></button>
                <button className={style.btn2}></button>
                <button className={style.btn3}></button>
                <button className={style.btn4}></button>
              </div>
              <div className={style}>
                <p>Description {myProduct?.description}</p>
              </div>
              <div className={style}>
                <button>Agregar al carrito</button>
              </div>
            </div>
          </div>
          <Link to="/">
            <button id="buttonReturn">Return</button>
          </Link>
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
