import React from 'react';
import { Link } from "react-router-dom";
import styles from './card.module.css';
// import { useDispatch } from "react-redux";
// import { deleteProductsById } from "../../redux/actions";


export default function Card({ id, name, href, imageSrc, imageAlt, price, stock, brand, category, description }) {

// aca va let dispatch = useDispatch();

// aca va const handleClose = () => { dispatch(deleteProductsById(id))}
  return (
    <div className='card'>
        <h1>{name}</h1>
        <p>{href}</p>
        <img src={imageSrc} alt={imageAlt} />
        <p>{price}</p>
        <p>{stock}</p>
        <p>{brand}</p>
        <p>{category}</p>
        <p>{description}</p>
    </div>
  );
}
