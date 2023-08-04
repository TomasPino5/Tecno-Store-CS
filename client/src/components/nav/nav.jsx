import SearchBar from "../searchbar/searchbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "../nav/nav.module.css";
import { clearFilter } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Cuando hacemos click en el logo limpia los filtros y nos muestra todos los productos
  const handleClearFilters = () => {
    dispatch(clearFilter());
    // Devuelve el valor de los select al origen
    document.getElementById("orderByPrice").value = "";
    document.getElementById("brandFilter").value = "";
    document.getElementById("categoryFilter").value = "";
  };

  return (
    <nav className={style.navContainer}>
      <div className={style.mainContainer}>
        <div className={style.buttonHome}>
          <NavLink to="/">
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
        </div>
      </div>
      <div className={style.SearchBarPosition}>
        {location.pathname === "/" ? <SearchBar /> : null}
      </div>
      <div className={style.container}>
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
    </nav>
  );
};

export default Nav;
