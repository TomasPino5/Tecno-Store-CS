import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importa el componente Router
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Envuelve la App en el componente Router */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
