import { useSelector } from 'react-redux';
import style from './userPurchases.module.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import StarRating from '../starRating/starRating';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";


const UserPurchases = () => {

    const { user } = useAuth0();
    const email = user.email
    const purchases = useSelector((state) => state.userPurchases)
    console.log(purchases)

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
            const existingRating = await axios.get(`http://localhost:3001/getRating/?userEmail=${email}&productId=${productId}`);

            // //Ruta para obtener Rating del usuario
            // router.get("/getRating", getUserRating);
            // //Controller
            // const Ratings = require("../models/ratings.js");

            // const getUserRating = async (req, res) => {
            //     const { email, productId } = req.query;
            //     if (email && productId) {
            //         try {
            //             const ratings = await Ratings.findOne({ where: { user: email, productId: productId } })
            //             res.status(200).jason(ratings)
            //         }
            //         catch (error) {
            //             res.status(500).jason(error.message)
            //         }
            //     } else {
            //         try {
            //             const allRatings = await Ratings.findAll({ where: { productId: productId } })
            //             res.status(200).jason(allRatings)
            //         } catch (error) {
            //             res.status(500).jason({ message: 'Todavia no hay reviews' })
            //         }
            //     }
            // }

            // module.exports = getUserRating;


            // /////////
            // if (existingRating !== 'Todavia no hay rating') {
            //     await axios.put(`http://localhost:3001/modifyUserRating/?userEmail=${email}&productId=${productId}`, { rating: rating })
            //     console.log("Has modificado la calificacion de este producto.");
            //     return;
            // }

            // //Ruta para modificar datos del usuario
            // router.put("/modifyUserRating/:email", modifyUserRating);

            // //controller
            // const Ratings = require("../models/ratings.js");

            // const modifyUserRating = async (req, res) => {
            //     const { email, productId } = req.query;
            //     const { rating } = req.body;
            //     try {
            //         const ratings = await Ratings.findOne({ where: { user: email, productId: productId } })
            //         ratings.rating = rating
            //         await ratings.save();
            //         res.status(200).send('Se ha actualizado la calificacion')
            //     } catch (error) {
            //         res.status(500).jason({ message: 'Hubo un error al actualizar la calificacion' })
            //     }
            // }

            // ///////////////
            // await axios.post('http://localhost:3001/rateProduct', {
            //     user: email,
            //     productId: productId,
            //     rating: rating,
            // });

            // //Ruta para guardar calificacion de producto
            // router.post("/rateProduct", postUserRating)

            // //controller
            // const Ratings = require("../models/ratings.js");

            // const postUserRating = async (req, res) => {
            //     const { user, productId, rating } = req.body
            //     try {
            //         const rating = await Ratings.create({ user, productId, rating });
            //         res.status(200).json({message: 'Calificacion cargada correctamente'});
            //     } catch (error) {
            //         res.status(500).json({message: error.message});
            //     }
            // }

            // ////////////
        } catch (error) {
            console.error(error);
        }
    };
    console.log(ratings)

    return (
        <div className={style.container}>
            {products.map((purchase) => (
                <div className={style.card} key={purchase.id}>
                    <p>{purchase.id}</p>
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
                            <button className={style.btnCalif} onClick={() => handleRatingChange(purchase.id, ratings[purchase.id] || 0)}>
                                Calificar
                            </button>
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