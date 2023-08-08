import React from "react";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../hero/hero";

const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100
  };

  return (
    <div className="div-construction pt-0 flex flex-col justify-start items-center">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Hero />
      <Slider className="slider" {...settings}>
        <Link to="/products">
               <div className="img2">
          <img
            className="img"
            src="https://i.ibb.co/Z89607V/logo-motorola.jpg"
            alt="logo motorola "
          />
        </div>

        </Link>

        <Link to = "/products">
        <div className="img2">

          <img
            className="img"
            src="https://i.ibb.co/bgptHWh/logo-samsung.jpg"
            alt="logo samsung"
          />
        </div>
        </Link>

        <Link to = "/products">
        <div className="img2">

          <img
            className="img"
            src="https://i.ibb.co/FVv7FRZ/logo-iphone.jpg"
            alt="logo apple"
          />
        </div>

        </Link>

        <Link to = "/products">
        <div className="img2">

          <img
            className="img"
            src="https://i.ibb.co/KGJtsS0/logo-xiaomi.jpg"
            alt="logo xiaomi"
          />
        </div>
        </Link>
       
      </Slider>
      </div>
  );
};

export default Carrusel;