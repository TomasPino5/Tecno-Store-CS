import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from 'axios'
require('dotenv').config();
//axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001/"; ya estaba/quimbay
axios.defaults.baseURL ="tecno-store-cs-production.up.railway.app";// es avisarle a axios que todas las peticiones empiezen o tengan una misma base url(front)para trabajar con el proyecto de forma local utilizamos este para las peticiones
//axios.defaults.baseURL = 'https://pokemonback-production.up.railway.app/';// conectar front con el back que ya deployamos// cuando queramos puchear o actualizar nuestro deploy del front  lo hacemos ac

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-njrrk6wlytkekvbb.us.auth0.com"
          clientId="AxyouAj91cWCLc6Rp1nZf6loAAs2U0Pq"
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
