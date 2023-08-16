import { useSelector } from 'react-redux';
import style from './userPurchases.module.css'
import { Link } from "react-router-dom";


const UserPurchases = () => {

    const purchases = useSelector((state) => state.userPurchases)
    console.log(purchases)

    const prod = purchases.map(p => p.products)
    //console.log(prod.flat())

    const products = prod.flat()
    //console.log(products)

    return (
        <div className={style.container}>
            {products.map((purchase) => (
                <div className={style.card} key={purchase.id}>
                    <img
                        src={purchase.imageSrc}
                        //alt={purchase.imageAlt}
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
                    <button className={style.btnCalif}>Calificar</button>
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