import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LogoutButton.module.css"; 

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className={styles.logoutButton} onClick={() => logout({ returnTo: window.location.origin })}>
      LogOut
    </button>
  );
};