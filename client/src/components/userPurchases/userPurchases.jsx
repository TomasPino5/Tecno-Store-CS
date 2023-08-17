import { useSelector, useDispatch } from 'react-redux';
import style from './userPurchases.module.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import StarRating from '../starRating/starRating';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { modifyUserRating, rateProduct } from "../../redux/actions";
import Swal from "sweetalert2";

const UserPurchases = () => {

    const dispatch = useDispatch();
    const { user } = useAuth0();
    const email = user?.email
    const purchases = useSelector((state) => state.userPurchases)
    //console.log(purchases)

    const prod = purchases.map(p => p.products)
    //console.log(prod.flat())

    const products = prod.flat()
    //console.log(products)

    const [ratings, setRatings] = useState({});

    const handleRatingChange = async (productId, rating) => {

        setRatings(prevRatings => ({
            ...prevRatings,
            [productId]: rating,
        }));

        try {
            const response = await axios.get(`/getRating/?userEmail=${email}&productId=${productId}`);
            const existingRating = response.data
            //console.log(existingRating)

            if (existingRating.length !== 0) {
                //await axios.put(`/modifyUserRating?email=${email}&productId=${productId}`, { rating: rating })
                dispatch(modifyUserRating(email, productId, { rating: rating }))
                console.log("Has modificado la calificacion de este producto.");
                //return alert("Has modificado la calificacion de este producto.");
                Swal.fire({
                    title: "Modificado",
                    text: "Has modificado la calificacion de este producto.",
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#28a745",
                  });
            }


            else {
                // await axios.post('/rateProduct', {
                //     user: email,
                //     productId: productId,
                //     rating: rating,
                // });
                dispatch(rateProduct({
                        user: email,
                        productId: productId,
                        rating: rating,
                    }))
                //alert("Has agregado calificacion a este producto.")
                Swal.fire({
                    title: "Agregado",
                    text: "Has agregado calificacion a este producto.",
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#28a745",
                  });
            }

        } catch (error) {
            console.error(error);
        }
    };
    //console.log(ratings)

    return (
        <div className={style.container}>
            <h2>Mis Compras</h2>
            {products.map((purchase) => (
                <div className={style.card} key={purchase.id}>
                    <img
                        src={purchase.imageSrc}
                        alt=''
                        className={style.itemImage}
                    />
                    <div className={style.purchasesDetails}>
                        <p className={style.purchasesName}>{purchase.name}</p>
                        <p>Cantidad: {purchase.quantity ? purchase.quantity : '1'}</p>
                        <p>Marca: {purchase.brand}</p>
                        <p className={style.price}>Precio: ${purchase.price.toLocaleString("es-ES", { minimumFractionDigits: 2 })}/u.</p>
                        <p className={style.price}>Total: ${(Number(purchase.price) * Number(purchase.quantity ? purchase.quantity : '1')).toLocaleString("es-ES", { minimumFractionDigits: 2 })}/u.</p>
                    </div>
                    <div className={style.contBtnCal}>
                        <div className={style.contBtnCal}>
                            <StarRating
                                value={ratings[purchase.id] || 0} // Valor actual de calificación
                                onChange={(rating) => handleRatingChange(purchase.id, rating)}
                            />
                            {/* <button className={style.btnCalif} onClick={() => handleRatingChange(purchase.id, ratings[purchase.id] || 0)}>
                                Calificar
                            </button> */}
                        </div>
                    </div>
                </div>
            ))}

            <Link to="/userProfile">
                <button className={style.btnReturn} id="buttonReturn">
                    Back
                </button>
            </Link>
        </div>
    )
}

export default UserPurchases;