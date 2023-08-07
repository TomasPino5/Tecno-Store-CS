import SearchBar from "../searchbar/searchbar";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "../loginForm/loginForm";
import image from "../../imag/Home/Logo_arquitectura_corporativo_verde_mostaza.png";
import style from "../nav/nav.module.css";

const Nav = ({ handleClearFilters }) => {
  const location = useLocation();

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <nav className={style.navContainer}>
      <div className={style.mainContainer}>
        <div className={style.buttonHome}>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={style.ordenador}>
              <img src={image} alt="tecnoStore" className={style.img__logo} />
            </div>
          </NavLink>
          {/* <button className={style.button}>
            <span className={style.actualtext}>&nbsp;Tecno/Store&nbsp;</span>
            <span
              onClick={handleClearFilters}
              className={style.hovertext}
              aria-hidden="true"
            >
              &nbsp;Tecno/Store&nbsp;
            </span>
          </button> */}
        </div>
      </div>
      <div className={style.SearchBarPosition}>
        {location.pathname === "/" ? <SearchBar /> : null}
      </div>
      <div className={style.container}>
        <button className={style.login} onClick={handleLoginButtonClick}>
          Login
        </button>
        <NavLink to="/form">
          <button className={style.newProduct}>
            <div tabIndex={0} className={style.plusButton}>
              <svg
                className={style.plusIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <g mask="url(#mask0_21_345)">
                  <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                </g>
              </svg>
            </div>
          </button>
        </NavLink>
      </div>
      {showLoginForm && <Login />}{" "}
      {/* Mostrar el formulario de inicio de sesión si showLoginForm es verdadero */}
    </nav>
  );
};

export default Nav;
