import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail } from "../../redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../imag/Loading/1.jpg";
// import img2 from "../../imag/Loading/2.jpg";
import img3 from "../../imag/Loading/3.webp";
import img4 from "../../imag/Loading/4.jpg";
import img5 from "../../imag/Loading/5.jpg";
import img6 from "../../imag/Loading/6.jpg";

import imgPublish1 from "../../imag/imgHome/envios.jpg";
import imgPublish2 from "../../imag/imgHome/pagina.jpg";
import imgPublish3 from "../../imag/imgHome/productos.jpg";
import imgPublish4 from "../../imag/imgHome/tarjetas.webp";
// import imgPublish5 from "../../imag/imgHome/envios.jpg";
import FaqSection from "./QandA";
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

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}
  useEffect(() => {
    dispatch(clearDetail());
  }, [dispatch]);

  return (
    <div className="div-construction pt-0 flex flex-col justify-start items-center">
      <div className={style.over}>
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
        <div
          className={
            darkMode ? style.button_filterdarkMode : style.button_filter
          }
        >
          <Link to={{ pathname: "/products" }}>
            <button>
              <img src="https://i.ibb.co/Z89607V/logo-motorola.jpg" alt="" />
            </button>
          </Link>

          <Link to={{ pathname: "/products" }}>
            <button>
              <img src="https://i.ibb.co/bgptHWh/logo-samsung.jpg" alt="" />
            </button>
          </Link>

          <Link to={{ pathname: "/products" }}>
            <button>
              <img src="https://i.ibb.co/FVv7FRZ/logo-iphone.jpg" alt="" />
            </button>
          </Link>

          <Link to={{ pathname: "/products" }}>
            <button>
              <img src="https://i.ibb.co/KGJtsS0/logo-xiaomi.jpg" alt="" />
            </button>
          </Link>
        </div>
        <div>
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to={{ pathname: "/products" }}
            className={darkMode ? style.linkWrapperdarkMode : style.linkWrapper}
          >
            <p className={style.pp}>Mira todos nuestros productos</p>
          </Link>
        </div>
        <div className={style.globo}>
          <img
            className={style.imgPres}
            src="https://img.freepik.com/free-photo/serious-thoughtful-dark-skinned-millennial-girl-with-afro-bushy-hair-points-away-copy-space_273609-45529.jpg?w=1060&t=st=1691789737~exp=1691790337~hmac=4afcddbc7196225178f251ac7a6de972df373509d8d8fe9b782d8a9b6f99f2b1"
            alt=""
          />
          <p className={darkMode ? style.globoTextodarkMode : style.globoTexto}>
            Somos una empresa comprometida con la calidad y excelencia en la
            industria de la tecnología. Ofrecemos una amplia gama de productos
            de alta calidad que satisfacen las necesidades de nuestros clientes.
            Además, contamos con un equipo de profesionales capacitados que se
            dedican a brindar un servicio excepcional en la reparación y
            mantenimiento de dispositivos móviles. En Tecno Store CS, nos
            esforzamos por ser líderes en la industria y proporcionar soluciones
            confiables y eficientes para todos nuestros clientes.
          </p>
        </div>
        <div>
          <div className={style.container}>
            <p className={darkMode ? style.globopdarkMode : style.globop}>
              Descubre Nuestra Gama de Celulares Excepcionales Encuentra una
              emocionante variedad de celulares que te cautivarán con su
              innovación y estilo. Nuestros productos te ofrecen un mundo de
              posibilidades para elegir y comprar. ¡Explora y elige el tuyo hoy
              mismo!
            </p>
            <img
              src="https://img.freepik.com/premium-photo/man-holding-smartphone_23-2148632180.jpg"
              alt=""
              className={style.imagen}
            />
          </div>

          <div className={style.container}>
            <img
              className={style.imagen2}
              src="https://img.freepik.com/free-photo/black-boy-posing-with-headphones_23-2148171577.jpg"
              alt=""
            />
            <p className={darkMode ? style.globop2darkMode : style.globop2}>
              Experimenta lo Último en Auriculares Eleva tus experiencias
              auditivas con nuestra selección de auriculares de primera calidad.
              Descubre un sonido envolvente y un diseño elegante que se adapta a
              tu estilo de vida. ¡Hazte con los auriculares perfectos ahora!
            </p>
          </div>

          <div className={style.flexContainer}>
            <div className={darkMode ? style.globoP2LdarkMode : style.globoP2L}>
              <p>
                Nuestro Local Te invitamos a sumergirte en la experiencia única
                de visitar nuestra tienda física. Experimenta la tecnología de
                vanguardia y recibe asesoramiento personalizado de nuestro
                equipo experto. ¡Te esperamos con los brazos abiertos!
              </p>
            </div>
            <img src={imgPublish2} alt="" className={style.centerImage} />
            <div className={darkMode ? style.globoP2RdarkMode : style.globoP2R}>
              <p>
                Explora Nuestros Productos Sumérgete en un mundo de opciones
                emocionantes mientras navegas por nuestra amplia gama de
                productos tecnológicos. Desde celulares de última generación
                hasta accesorios de primera calidad, ¡encontrarás todo lo que
                necesitas aquí!
              </p>
            </div>
          </div>
          <div className={style.container}>
            <p className={darkMode ? style.globop3darkMode : style.globop3}>
              Garantía al 100% Nuestra pasión por la calidad se refleja en cada
              producto que ofrecemos. Con nuestra garantía al 100%, puedes
              comprar con total tranquilidad sabiendo que estás obteniendo lo
              mejor. ¡Experimenta la excelencia en cada compra!
            </p>
            <img className={style.imagen3} src={imgPublish3} alt="" />
          </div>
          <div div className={style.container}>
            <img className={style.imagen5} src={imgPublish4} alt="" />
            <p className={darkMode ? style.globop5darkMode : style.globop5}>
              Aceptamos Todas las Tarjetas Simplifica tus compras con nosotros,
              ya que aceptamos todas las tarjetas de crédito y débito
              principales. Tu conveniencia es nuestra prioridad, y estamos aquí
              para hacer que el proceso de pago sea fluido y sin complicaciones.
            </p>
          </div>
          <div className={style.container}>
            <p className={darkMode ? style.globop4darkMode : style.globop4}>
              Experimenta la Comodidad Olvídate de las preocupaciones de ir de
              compras. Te llevamos la tecnología directamente a tu puerta. Con
              nuestra entrega confiable y segura, recibirás tus productos en la
              comodidad de tu hogar. ¡Haz tu pedido ahora y espera lo mejor!
            </p>
            <img className={style.imagen3} src={imgPublish1} alt="" />
          </div>
        </div>

        <FaqSection />

        <div className={style.slider__position}>
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
      </div>
    </div>
  );
};

export default Carrusel;
