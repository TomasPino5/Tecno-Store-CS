import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName } from "../../redux/actions";
import style from "../searchbar/searchbar.module.css";
import { useLocation } from "react-router-dom";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(getProductName(name));
    if (location.pathname !== "/admin") {
      setCurrentPage(1)
    }
    setName("");
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={style.search}>
      <input
        className={style.search__input}
        type="text"
        placeholder="Find your product"
        value={name}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={(event) => onKeyDown(event)}
      />
      <button
        className={style.search__button}
        aria-hidden="true"
        viewBox="0 0 24 24"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <svg
          className={style.search__icon}
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
