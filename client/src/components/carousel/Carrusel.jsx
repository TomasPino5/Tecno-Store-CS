import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../imag/Loading/1.jpg";
import img2 from "../../imag/Loading/2.jpg";
import img3 from "../../imag/Loading/3.webp";
import img4 from "../../imag/Loading/4.jpg";
import img5 from "../../imag/Loading/5.jpg";
import img6 from "../../imag/Loading/6.jpg";

import Hero from "../hero/hero";
import style from "./carrusel.module.css";

const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
  };

  return (
    <div className="div-construction pt-0 flex flex-col justify-start items-center">
      <div className={style.marg}>
        <Hero />
      </div>
      <div className={style.img_carrucel_center}>
        <div className={style.img_carrucel}>
          <ul>
            <li>
              <img src={img1} alt="" />
            </li>

            <li>
              <img src={img3} alt="" />
            </li>
            <li>
              <img src={img4} alt="" />
            </li>
            <li>
              <img src={img5} alt="" />
            </li>
            <li>
              <img src={img6} alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div className={style.button_filter}>
        <button>
          <img src="https://i.ibb.co/Z89607V/logo-motorola.jpg" alt="" />
        </button>
        <button>
          <img src="https://i.ibb.co/bgptHWh/logo-samsung.jpg" alt="" />
        </button>
        <button>
          <img src="https://i.ibb.co/FVv7FRZ/logo-iphone.jpg" alt="" />
        </button>
        <button>
          <img src="https://i.ibb.co/KGJtsS0/logo-xiaomi.jpg" alt="" />
        </button>
      </div>
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

        <Link to="/products">
          <div className="img2">
            <img
              className="img"
              src="https://i.ibb.co/bgptHWh/logo-samsung.jpg"
              alt="logo samsung"
            />
          </div>
        </Link>

        <Link to="/products">
          <div className="img2">
            <img
              className="img"
              src="https://i.ibb.co/FVv7FRZ/logo-iphone.jpg"
              alt="logo apple"
            />
          </div>
        </Link>

        <Link to="/products">
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
