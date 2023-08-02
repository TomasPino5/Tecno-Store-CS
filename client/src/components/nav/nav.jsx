import SearchBar from "../searchbar/searchbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from '../nav/nav.module.css';

const Nav = () => {
  const location = useLocation();

  return (
    <nav>
      <div className={style.mainContainer}>
        <NavLink to="/home">
          <span aria-hidden="true">tecno-store-cs</span>
          <button className={style.home}>Home</button>
        </NavLink>
      </div>
      {location.pathname !== "*" && location.pathname !== "/Mygames" ? (
        <SearchBar />
      ) : null}
      <div>
      <NavLink to="/form">
      <button className={style.newProduct}>New Product</button>
        </NavLink>
        <NavLink to="/Error">
          <span aria-hidden="">Error</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
