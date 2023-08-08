import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
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
