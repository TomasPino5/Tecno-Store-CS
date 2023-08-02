import SearchBar from "../searchbar/searchbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  return (
    <nav>
      <div>
        <NavLink to="/">
          <span aria-hidden="true">tecno-store-cs</span>
        </NavLink>
      </div>
      {location.pathname !== "*" && location.pathname !== "/Mygames" ? (
        <SearchBar />
      ) : null}
      <div>
        <NavLink to="/Error">
          <span aria-hidden="">Error</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
