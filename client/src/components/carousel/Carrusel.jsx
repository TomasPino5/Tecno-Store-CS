import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100
  };

  return (
      <Slider className="slider" {...settings}>
        <div className="img2">
          <img
            className="img"
            src="https://i.ibb.co/F3g9G0j/logo-motorola.jpg"
            alt="logo motorola "
          />
        </div>
        <div className="img22">
          <img
            className="img"
            src="https://i.ibb.co/HnsDxxz/logo-samsung.jpg"
            alt="logo samsung"
          />
        </div>
        <div className="img33">
          <img
            className="img"
            src="https://i.ibb.co/yhbJ59d/logo-iphone.jpg"
            alt="logo apple"
          />
        </div>
        <div className="img44">
          <img
            className="img"
            src="https://i.ibb.co/hFpkCwp/logo-xiaomi.jpg"
            alt="logo xiaomi"
          />
        </div>
       
      </Slider>
  );
};

export default Carrusel;