import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from 'axios';

//localhost
// axios.defaults.baseURL = 'http://localhost:3001'

//railway
axios.defaults.baseURL = 'https://tecno-server.onrender.com/'

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
          clientId="ZI2vEIvX5UON3TFBf1acm5MsXcT3n9P4"
          redirectUri={window.location.origin}
        >
          <DarkModeApp /> {/* Renderiza DarkModeApp en lugar de App */}
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
