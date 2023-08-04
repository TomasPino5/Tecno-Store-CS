import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import style from "./form.module.css";

const Form = () => {
  //HOOKS
  const dispatch = useDispatch();
  let navigate = useNavigate();

  //STATES
  const [form, setForm] = useState({
    name: "",
    imageSrc: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    description: "",
  });
  
  //Declaraciones de estados
  const [nameError, setNameError] = useState("The name is required");
  const [priceError, setPriceError] = useState("The price is required");
  const [stockError, setStockError] = useState("The stock is required");
  const [brandError, setBrandError] = useState("The brand is required");
  const [categoryError, setCategoryError] = useState("The category is required");
  const [descriptionError, setDescriptionError] = useState("The description is required");

//Validacion de nombre
  const validateName = (name) => {
    if (name.trim() === "") {
      setNameError("The name is required!");
    } else {
      setNameError("");
    }
  };

//Validacion de precio
  const validatePrice = (price) => {
    if (price.trim() === "" || isNaN(price) || Number(price) <= 0) {
      setPriceError("Please enter a valid price!");
    } else {
      setPriceError("");
    }
  };

  //Validacion de stock
  const validateStock = (stock) => {
    if (stock.trim() === "" || isNaN(stock) || Number(stock) < 0) {
      setStockError("Please enter a valid stock quantity!");
    } else {
      setStockError("");
    }
  };

  //Validacion de marcas
  const validateBrand = (brand) => {
    if (brand.trim() === "") {
      setBrandError("The brand is required!");
    } else {
      setBrandError("");
    }
  };

  //Validacion de categoria
  const validateCategory = (category) => {
    if (category.trim() === "") {
      setCategoryError("The category is required!");
    } else {
      setCategoryError("");
    }
  };
  
  //Validacion de descripcion
  const validateDescription = (description) => {
    if (description.trim() === "") {
      setDescriptionError("The description is required!");
    } else {
      setDescriptionError("");
    }
  };

  //Se extrae el nombre del campo y el valor del evento
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    
    //Actualiza el estado del form
    setForm({  
      ...form,
      [property]: value,
    });
    
    //Realiza acciones segun el campo que ha cambiado
    switch (property) {
      case "name":
        validateName(value);
        break;
      case "price":
        validatePrice(value);
        break;
      case "stock":
        validateStock(value);
        break;
      case "brand":
        validateBrand(value);
        break;
      case "category":
        validateCategory(value);
        break;
      case "description":
        validateDescription(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(postProduct(form));
    alert("You just set the new Product");
    setForm({
      name: "",
      imageSrc: "",
      price: "",
      stock: "",
      brand: "",
      category: "",
      description: "",
    });
    navigate("/home");
  };

  return (
    <div>
      <div className={style.buttonReturn}>
        <Link to="/">
          <button className={style.button}>Return</button>
        </Link>
      </div>
      <div className={style.card}>
        <span className={style.card__title} id="title">
          Create your own Product !
        </span>

        <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Product Name: </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => changeHandler(e)}
              name="name"
              placeholder="Write Product name..."
            />
            {nameError && (
              <strong className={style.card__content}>{nameError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Image Product: </label>
            <input
              type="url"
              value={form.imageSrc}
              onChange={(e) => changeHandler(e)}
              name="image"
              placeholder="Put image..."
            />
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}> Price: </label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => changeHandler(e)}
              name="price"
              placeholder="Write Product price..."
            />
            {priceError && (
              <strong className={style.card__content}>{priceError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}> Stock: </label>
            <input
              type="text"
              value={form.stock}
              onChange={(e) => changeHandler(e)}
              name="stock"
              placeholder="Write Product stock..."
            />
            {stockError && (
              <strong className={style.card__content}>{stockError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}> Brand: </label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => changeHandler(e)}
              name="brand"
              placeholder="Write Product brand..."
            />
            {brandError && (
              <strong className={style.card__content}>{brandError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}> Category: </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => changeHandler(e)}
              name="category"
              placeholder="Write Product category..."
            />
            {categoryError && (
              <strong className={style.card__content}>{categoryError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}> Description : </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => changeHandler(e)}
              name="description"
              placeholder="Write Product description..."
            />
            {descriptionError && (
              <strong className={style.card__content}>
                {descriptionError}
              </strong>
            )}
          </div>
          <div calssName={style.btn}>
            <button
              disabled={
                nameError ||
                priceError ||
                categoryError ||
                brandError ||
                descriptionError
              }
              type="submit"
              className={style.btn}
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;