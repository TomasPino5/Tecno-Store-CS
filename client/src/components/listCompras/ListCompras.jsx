import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompras } from "../../redux/actions";
import listCompras from './listCompras.css';

const ListCompras = ()=>{

    const dispatch = useDispatch();
    const compras = useSelector((state)=> state.getCompras);

    useEffect(()=>{
        dispatch(getCompras());
    },[])
    return(
        <div className="container-compras">
            {
                compras.map((prop,key)=>{
                    return(
                        <div key={key} className="compras">
                            <p>{prop.user.email}</p>
                            <p>{prop.user.direction}</p>
                            <p>{prop.user.telefone}</p>
                            <p>{prop.products[0].name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListCompras;