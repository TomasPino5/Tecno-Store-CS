import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Carrusel from "./Carrusel";
import "./Carousel.module.css";

const Carousel = () => {
  return (
    <div className="carrusel">
      <h1>Visitá nuestra tienda</h1>
      <Carrusel />
    </div>
  );
};

export default Carousel;