import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Loading/Loading";
import style from "./profile.module.css";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    isAuthenticated && (
      <div>
        <div className={style.img_container_prof}>
          <img className={style.img_prof} src={user.picture} alt={user.name} />
        </div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};
