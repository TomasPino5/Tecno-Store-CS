import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const DarkModeApp = () => {
  const darkMode = useSelector((state) => state.darkMode); // Obtiene el estado de darkMode

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <App />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-njrrk6wlytkekvbb.us.auth0.com"
          clientId="AxyouAj91cWCLc6Rp1nZf6loAAs2U0Pq"
          redirectUri={window.location.origin}
        >
          <DarkModeApp /> {/* Renderiza DarkModeApp en lugar de App */}
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
