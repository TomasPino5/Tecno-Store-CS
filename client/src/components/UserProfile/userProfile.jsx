// import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//import { getUser } from "../../redux/actions";
import { putUser } from "../../redux/actions";

const UserProfile = () => {

    //const { user, isAuthenticated } = useAuth0();

    const dispatch = useDispatch();
    const dataUser = useSelector((state) => state.user);
    //const email = user.email

    // useEffect(() => {
    //     dispatch(getUser(email));
    // }, [dispatch, email]);

    useEffect(() => {
        if (dataUser) {
            localStorage.setItem('userData', JSON.stringify(dataUser));
        }
    }, [dataUser]);

    const email = dataUser.email

    const handleModifyUserData = () => {
        dispatch(putUser(email, data));
    }

    const [data, setData] = useState({
        name: '',
        direction: '',
        telefone: '',
        picture: ''
    });

    const inputOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    console.log(data)
    return (
        <div>
            <div>
                <img src={dataUser.picture} alt="" />
            </div>
            <div>
                <h1>Mis Datos</h1>
                <div>
                    <h2>Datos de Cuenta:</h2>
                    {/* <p>Email:{user.email}</p>
                    <p>Usuario:{user.name}</p> */}
                    <p>Email:{dataUser.email}</p>
                    <p>Usuario:{dataUser.name}</p>
                </div>
                <div>
                    <h2>Datos personales:</h2>
                    <p>Direccion: {dataUser.direction ? dataUser.telefone : 'Agregar direccion personal...'}</p>
                    <p>Telefono: {dataUser.telefone ? dataUser.telefone : 'Agregar numero de linea...'}</p>
                </div>

                <button>Editar Datos</button>
                <form action="">
                    <label htmlFor="">Nombre</label>
                    <input type="text" value={data.name} name="name" onChange={inputOnChange} />
                    <label htmlFor="">Direccion</label>
                    <input type="text" value={data.direction} name="direction" onChange={inputOnChange} />
                    <label htmlFor="">Telefono</label>
                    <input type="text" value={data.telefone} name="telefone" onChange={inputOnChange} />
                    <label htmlFor="">Imagen</label>
                    <input type="text" value={data.picture} name="picture" onChange={inputOnChange} />
                    <button onClick={handleModifyUserData}>Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default UserProfile;