import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductName } from "../../redux/actions";
import style from '../searchbar/searchbar.module.css';


export default function SearchBar() {

  const dispatch = useDispatch();

  const [name, setName] = useState('')

  const handleInputChange = (e) =>{
    setName(e.target.value)
  }

  const handleSubmit = () =>{
    dispatch(getProductName(name))
  }

  return (
    <div className={style.SearchContainer}>
            <input className={style.bar} type="text" placeholder="Find your product...🔍" onChange={(e) => handleInputChange(e)}  />
            <button className={style.search} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
  );
}
