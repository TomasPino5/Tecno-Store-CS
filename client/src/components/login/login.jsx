
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styles from "./loginForm.module.css";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className={styles.LoginButton} onClick={() => loginWithRedirect()}>Login</button>;
};