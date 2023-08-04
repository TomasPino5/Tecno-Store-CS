import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import style from "./form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    imageSrc: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    description: "",
  });

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockError, setStockError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validateName = (name) => {
    setNameError(name.trim() === "" ? "¡Se requiere el nombre!" : "");
  };

  const validatePrice = (price) => {
    setPriceError(
      price.trim() === "" || isNaN(price) || Number(price) <= 0
        ? "¡Por favor ingresa un precio válido!"
        : ""
    );
  };

  const validateStock = (stock) => {
    setStockError(
      stock.trim() === "" || isNaN(stock) || Number(stock) < 0
        ? "¡Por favor ingresa una cantidad de stock válida!"
        : ""
    );
  };

  const validateBrand = (brand) => {
    setBrandError(brand.trim() === "" ? "¡Se requiere la marca!" : "");
  };

  const validateCategory = (category) => {
    setCategoryError(category.trim() === "" ? "¡Se requiere la categoría!" : "");
  };

  const validateDescription = (description) => {
    setDescriptionError(description.trim() === "" ? "¡Se requiere la descripción!" : "");
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    
    setForm({  
      ...form,
      [property]: value,
    });
    
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
    alert("Has creado un nuevo producto");
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
          <button className={style.button}>Volver</button>
        </Link>
      </div>
      <div className={style.card}>
        <span className={style.card__title} id="title">
          ¡Crea tu propio producto!
        </span>

        <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Nombre del Producto: </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => changeHandler(e)}
              name="name"
              placeholder="Escribe el nombre del producto..."
            />
            {nameError && <strong className={style.card__content}>{nameError}</strong>}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Imagen del Producto: </label>
            <input
              type="url"
              value={form.imageSrc}
              onChange={(e) => changeHandler(e)}
              name="image"
              placeholder="Ingresa la URL de la imagen..."
            />
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Precio: </label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => changeHandler(e)}
              name="price"
              placeholder="Escribe el precio del producto..."
            />
            {priceError && <strong className={style.card__content}>{priceError}</strong>}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Stock: </label>
            <input
              type="text"
              value={form.stock}
              onChange={(e) => changeHandler(e)}
              name="stock"
              placeholder="Escribe la cantidad de stock..."
            />
            {stockError && <strong className={style.card__content}>{stockError}</strong>}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Marca: </label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => changeHandler(e)}
              name="brand"
              placeholder="Escribe la marca del producto..."
            />
            {brandError && <strong className={style.card__content}>{brandError}</strong>}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Categoría: </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => changeHandler(e)}
              name="category"
              placeholder="Escribe la categoría del producto..."
            />
            {categoryError && <strong className={style.card__content}>{categoryError}</strong>}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Descripción: </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => changeHandler(e)}
              name="description"
              placeholder="Escribe la descripción del producto..."
            />
            {descriptionError && <strong className={style.card__content}>{descriptionError}</strong>}
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
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
