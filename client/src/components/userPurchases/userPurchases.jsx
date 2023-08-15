//import { getUserPurchases } from "../../redux/actions";
import { useSelector } from 'react-redux';
//import { useAuth0 } from "@auth0/auth0-react";
//import { useEffect } from "react"
import style from './userPurchases.module.css'

const UserPurchases = () => {

    //const { user } = useAuth0();
    //const dispatch = useDispatch()
    //const email = user.email

    // useEffect(() => {
    //     dispatch(getUserPurchases(email));
    //   }, [dispatch, email]);

    const purchases = useSelector((state) => state.userPurchases)
    

    return (
        <div className={style.container}>
            {purchases.map((purchase) => (
          <div key={purchase.id}>
            {/* <img
              src={purchase.picture}
              //alt={purchase.imageAlt}
              //className={purchase.itemImage}
            /> */}
            <div className={style.purchasesDetails}>
              <p className={style.purchasesName}>{purchase.productName}</p>
              <p>Cantidad: {purchase.productQuantity}</p>
              <p>Marca: {purchase.productBrand}</p>
              <p className={style.purchasesPrice}>
                Precio: $
                {purchase.productPrice}
              </p>
              <p className={style.purchasesPrice}>
                Total: $
                {purchase.totalPurchase}
              </p>
            </div>
          </div>
        ))}
        </div>
    )
}

export default UserPurchases;