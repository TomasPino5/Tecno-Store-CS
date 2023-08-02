import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearDetail } from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";
import "../detail/detail.module.css";

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

  return ( <div className="Detail">
  {!loading ? (
          <>
          <div className="detailContainer">
                  <div className="detailDentro">
                      {myProduct.title ? (
                          <h1>{myProduct.title}</h1>
                      ) : (
                          <h1>{myProduct.name}</h1>
                      )}
                      <img src={myProduct?.imageSrc}
                      alt="img not found"
                      width="280px"
                      height="200px"
                      />
                      <h2>
                          Price:{" "}
                          {myProduct?.price}
                      </h2>
                      <h2>
                          Stock:{" "}
                          {myProduct?.stock}
                      </h2>
                      <h2>
                          Brand:{" "}
                          {myProduct?.brand}
                      </h2>
                      <h2>
                          Category:{" "}
                          {myProduct?.category}
                      </h2>
                      
                  </div>
                  <div className="detailContainerUno">
                  <h1>
                          Description{" "}
                          {myProduct?.description}
                      </h1>
                  </div>
          </div>
              <Link to="/home">
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
