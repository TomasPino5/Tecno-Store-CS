import SearchBar from "../searchbar/searchbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "../nav/nav.module.css";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className={style.navContainer}>
      <div className={style.mainContainer}>
        <div className={style.buttonHome}>
          <NavLink to="/Home">
            <button className={style.button}>
              <span className={style.actualtext}>&nbsp;Tecno/Store&nbsp;</span>
              <span className={style.hovertext} aria-hidden="true">
                &nbsp;Tecno/Store&nbsp;
              </span>
            </button>
          </NavLink>
        </div>
      </div>
      <div className={style.SearchBarPosition}>
        {location.pathname !== "*" && location.pathname !== "/Mygames" ? (
          <SearchBar />
        ) : null}
      </div>
      <div className={style.container}>
        <NavLink to="/form">
          <button className={style.newProduct}>New Product</button>
        </NavLink>
        <NavLink to="/Error">
          <span aria-hidden="true">Error</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
