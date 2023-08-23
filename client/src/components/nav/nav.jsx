import SearchBar from "../searchbar/searchbar";
import React, { useEffect } from "react"; //{ useState }
import { Profile } from "../profile/profile";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoginButton } from "../login/login";
import { LogoutButton } from "../logout/logout";
import { useAuth0 } from "@auth0/auth0-react";
import { toggleDarkMode } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
//import image from "../../imag/Home/Logo_arquitectura_corporativo_verde_mostaza.png";
import style from "../nav/nav.module.css";
import Cart from "../cart/cart";

const Nav = ({ setCurrentPage }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const { user } = useAuth0();

  const navigate = useNavigate()

  const handleFavNavigate = () =>{
    navigate("/favorites")
  }

  const handleSettNavigate = () =>{
    navigate("/admin")
  }

  const dataUser = useSelector((state) => state.user);

  const isAdmin = () => {
    // Array de direcciones de correo electrónico permitidas para acceder a la ruta de administrador
    const allowedEmails = [
      "menseguezmariano@gmail.com",
      "cottiersolchu55@gmail.com",
      "adlotorrez91@gmail.com",
      "sebastianhnry@gmail.com",
      "tomaspino.velez@gmail.com",
      "tomasbaldi@gmail.com",
      "kayita_y@hotmail.com",
    ];

    return (
      isAuthenticated && dataUser?.admin === true || allowedEmails.includes(dataUser?.email)// Verificar si el correo del usuario está en la lista
    );
  };

  useEffect(() => {
    // Obtener el valor actual del modo oscuro desde localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      dispatch(toggleDarkMode());
      console.log(darkMode);
    }
  }, [dispatch]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
    // Cambiar el valor en localStorage
    localStorage.setItem("darkMode", !darkMode);
    console.log(darkMode);
  };

  return (
    <nav className={style.navContainer}>
      <NavLink
        className={style.navTS}
        to="/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button className={style.button}>
          <span className={style.actualtext}>&nbsp;Tecno/Store&nbsp;</span>
          <span
            // onClick={handleClearFilters}
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
        {location.pathname === "/products" ? <SearchBar setCurrentPage={setCurrentPage} /> : null}
      </div>

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

      <div>
        <NavLink to="/products">
          {location.pathname === "/products" ? null : (
            <button className={style.btnNP}>Nuestros productos</button>
          )}
        </NavLink>
      </div>

      <div className={style.login}>
        {/* <button className={style.login} onClick={handleLoginButtonClick}>
            Login
          </button> */}
        {/* <NavLink to="/favorites">
          {location.pathname === "/favorites" ? null : (
            <button className={style.btnFav} > ♡ </button>
          )}
        </NavLink> */}
        {location.pathname === "/favorites" ? null : (
            <button onClick={handleFavNavigate} className={style.btnFav} > ♡ </button>
          )}

        <div>
          <button
            className={darkMode ? style.darkMode : style.lightMode}
            onClick={handleToggleDarkMode}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
        <div className={style.cartpos}>
          {location.pathname === "/pay" ||
            location.pathname === "/userProfile" ? null : (
            <Cart />
          )}
        </div>

        {location.pathname === "/admin" ? (
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
        ) : null}
        {isAuthenticated ? (
          <>
            <Profile />
            {location.pathname === "/userProfile" ? <LogoutButton /> : null}
            {/* <LogoutButton /> */}
          </>
        ) : (
          <LoginButton />
        )}
      </div>
      {isAdmin() && (
        <div>
        {location.pathname === "/userProfile" ?
        <button onClick={handleSettNavigate} class={style.buttonSt}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" class={style.svgicon}><g stroke-width="1.5" stroke-linecap="round" stroke="#08ef56"><circle r="2.5" cy="10" cx="10"></circle><path fill-rule="evenodd" d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z" clip-rule="evenodd"></path></g></svg>
          {/* <span class={style.lableSt}></span> */}
        </button>
        : null}
        </div>
        // <NavLink to="/admin">
        //   {/* <button className={style.btnNP}>Configuración</button> */}
        //   {location.pathname === "/userProfile" ?
        //   <button class={style.buttonSt}>
        //     <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" class={style.svgicon}><g stroke-width="1.5" stroke-linecap="round" stroke="#08ef56"><circle r="2.5" cy="10" cx="10"></circle><path fill-rule="evenodd" d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z" clip-rule="evenodd"></path></g></svg>
        //     <span class={style.lableSt}>Settings</span>
        //   </button>
        //   : null}
        // </NavLink>
      )}
    </nav>
  );
};

export default Nav;
