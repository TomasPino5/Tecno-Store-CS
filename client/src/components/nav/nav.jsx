import SearchBar from "../searchbar/searchbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "../nav/nav.module.css";
import { clearFilter } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Nav = () => {

  const dispatch = useDispatch()
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
              <span onClick={handleClearFilters} className={style.hovertext} aria-hidden="true">
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
      </div>
    </nav>
  );
};

export default Nav;
