import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Loading/Loading"
import axios from "axios";
import { useEffect } from "react";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user)
      const info = async () => {
        const userData = {
          name: user.name?user.name:user.nickname,
          email: user.email,
          email_verified: user.email_verified,
          picture: user.picture,
        };
        try {
          const response = await axios.post('http://localhost:3001/login', userData);
          console.log(response.data.message);
        } catch (error) {
          console.error('Error al guardar los datos:', error);
        }
      };
      info();
    }
  }, [isAuthenticated, user.name, user.email]);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};