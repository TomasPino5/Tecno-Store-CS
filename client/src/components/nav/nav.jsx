import SearchBar from "../searchbar/searchbar";
import React from "react"; //{ useState } 
import { Profile } from "../profile/profile";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoginButton } from "../login/login";
import { LogoutButton } from "../logout/logout";
import { useAuth0 } from "@auth0/auth0-react";
//import image from "../../imag/Home/Logo_arquitectura_corporativo_verde_mostaza.png";
import style from "../nav/nav.module.css";
import Cart from "../cart/cart";

const Nav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();

  return (
    <nav className={style.navContainer}>

      <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <button className={style.button}>
          <span className={style.actualtext}>&nbsp;Tecno/Store&nbsp;</span>
          <span
            onClick={handleClearFilters}
            className={style.hovertext}
            aria-hidden="true"
          >
            &nbsp;Tecno/Store&nbsp;
          </span>
        </button>
      </NavLink>

      {/* <div className={style.mainContainer}>
        <div className={style.buttonHome}>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={style.ordenador}>
              <img src={image} alt="tecnoStore" className={style.img__logo} />
            </div>
          </NavLink>
        </div>
      </div> */}

      <div className={style.SearchBarPosition}>
        {location.pathname === "/products" ? <SearchBar /> : null}
      </div>

      <Cart />

      {/* <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <NavLink to="/cart">
          <a href="/cart">
            <button type="button" class={style.carrito}>
              <span class="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </button>
          </a>
          <span class="text-gray-400 text-xs mb-6 ml-[-4px]">1</span>
        </NavLink>
      </div> */}

      <div className={style.container}>
        <NavLink to="/products">
          <button className={style.NuevosProd}>Nuestros productos</button>
        </NavLink>
      </div>


      <div className={style.login}>
        {/* <button className={style.login} onClick={handleLoginButtonClick}>
            Login
          </button> */}

        {isAuthenticated ? (
          <>
            <Profile />
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}


        {location.pathname === "/products" ?
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
          : null}
      </div>
    </nav>
  );
};

export default Nav;
