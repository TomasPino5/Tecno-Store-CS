import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Loading/Loading"
import axios from "axios";
import { useEffect } from "react"
import { Link } from "react-router-dom";
//
import { getUser } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import style from './profile.module.css'

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const dataUser = useSelector((state) => state.user);
  //
  const email = user.email
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(email));
  }, [dispatch, email]);
  //

  useEffect(() => {
    if (isAuthenticated) {
      const info = async () => {
        const userData = {
          name: user.name ? user.name : user.nickname,
          email: user.email,
          email_verified: user.email_verified,
          picture: user.picture,
        };
        try {
          const response = await axios.post('http://localhost:3001/login', userData);
          console.log(response.data.message);
        } catch (error) {
          // console.log('Error al guardar los datos:', error);
        }
      };
      info();
    }
  }, [isAuthenticated, user.name, user.email, user.email_verified, user.picture, user.nickname]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    isAuthenticated && (
      <div  >
        <div >
          <Link to={'/userProfile'}>
            <img className={style.img} src={dataUser?.picture ? dataUser.picture : user.picture} alt={user.name} />
          </Link>
        </div>
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};


// export const getProducts = () => {
//       return dispatch({
//           type: GET_USER,
//           payload: user
//       })
// };