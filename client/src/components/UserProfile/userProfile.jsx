// import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

const UserProfile = ()=>{

    const { user, isAuthenticated} = useAuth0();

    const dispatch = useDispatch();
    const dataUser = useSelector((state)=>state.user);

    useEffect(()=>{
        // dispatch(user);
    },[dispatch, user]);
    console.log(user);

    return(
        <div>
            <div>
                <img src="" alt="" />
                {/* <button>{user.picture?'Editar imagen':'Subir imagen'}</button> */}
            </div>
            <div>
                <h1>Mis Datos</h1>
                <div>
                <h2>Datos de Cuenta:</h2>
                    {/* <p>Email:{user.email}</p>
                    <p>Usuario:{user.name}</p> */}
                    <button>Cambiar Nombre</button>
                </div>
                <div>
                    <h2>Datos personales:</h2>
                    <p>Direccion:</p>
                    <button>Modificar</button>
                    <p>Telefono:</p>
                    <button>Modificar</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;