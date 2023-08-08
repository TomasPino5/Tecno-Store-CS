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
    href: "", //agregado
    imageSrc: "",
    imageAlt: "", //agregado
    price: "",
    brand: "",
    min: "", //agregado
    stock: "",
    category: "",
    description: "",
  });

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockError, setStockError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [imageSrc, setImageSrcError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageAltError, setImageAltError] = useState("");
  const [hrefError, setHrefError] = useState("");
  const [minError, setMinError] = useState("");

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

  const validateImgSrc = (imageSrc) => {
    setImageSrcError(
      /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/.test(imageSrc)
        ? ""
        : "¡Por favor ingresa una img válida!"
    );
  };

  const validateCategory = (category) => {
    setCategoryError(
      category.trim() === "" ? "¡Se requiere la categoría!" : ""
    );
  };

  const validateDescription = (description) => {
    setDescriptionError(
      description.trim() === "" ? "¡Se requiere la descripción!" : ""
    );
  };
  // aca agrego las 3 faltantes
  const validateImgAlt = (imageAlt) => {
    setImageAltError(
      imageAlt.trim() === "" ? "¡Se requiere el Alt de la imagen!" : ""
    );
  };

  const validateHref = (href) => {
    setHrefError(href.trim() === "" ? "¡Se requiere href!" : "");
  };
  const validateMin = (min) => {
    setMinError(min.trim() === "" ? "¡Se requiere el min!" : "");
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
      case "imageSrc":
        validateImgSrc(value);
        break;
      case "min":
        validateMin(value);
        break;
      case "imageAlt":
        validateImgAlt(value);
        break;
      case "href":
        validateHref(value);
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
      href: "",
      imageSrc: "",
      imageAlt: "",
      price: "",
      brand: "",
      min: "",
      stock: "",
      category: "",
      description: "",
    });
    navigate("/products");
  };

  return (
    <div className={style.form__C}>
      <div className={style.card}>
        <span className={style.card__title} id="title">
          Create your own product
        </span>

        <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Name of product: </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => changeHandler(e)}
              name="name"
              placeholder="Escribe el nombre del producto..."
            />
            {nameError && (
              <strong className={style.card__content}>{nameError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Image of product: </label>
            <input
              type="text"
              value={form.imageSrc}
              onChange={(e) => changeHandler(e)}
              name="imageSrc"
              placeholder="Ingresa la URL de la imagen..."
            />
            {imageSrc && (
              <strong className={style.card__content}>{imageSrc}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Price: </label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => changeHandler(e)}
              name="price"
              placeholder="Escribe el precio del producto..."
            />
            {priceError && (
              <strong className={style.card__content}>{priceError}</strong>
            )}
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
            {stockError && (
              <strong className={style.card__content}>{stockError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Brand: </label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => changeHandler(e)}
              name="brand"
              placeholder="Escribe la marca del producto..."
            />
            {brandError && (
              <strong className={style.card__content}>{brandError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Category: </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => changeHandler(e)}
              name="category"
              placeholder="Escribe la categoría del producto..."
            />
            {categoryError && (
              <strong className={style.card__content}>{categoryError}</strong>
            )}
          </div>
          <div className={style.card__form}>
            <label className={style.label__form}>Description: </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => changeHandler(e)}
              name="description"
              placeholder="Escribe la descripción del producto..."
            />
            {descriptionError && (
              <strong className={style.card__content}>
                {descriptionError}
              </strong>
            )}
          </div>

          {/* ACA VAN LAS 3 PROPIEDADES FALTANTES  */}

          {/* HREF */}
          <div className={style.card__form}>
            <label className={style.label__form}>Href: </label>
            <input
              type="text"
              value={form.href}
              onChange={(e) => changeHandler(e)}
              name="href"
              placeholder="Escribe el href del producto..."
            />
            {hrefError && (
              <strong className={style.card__content}>{hrefError}</strong>
            )}
          </div>

          {/* imageAlt */}
          <div className={style.card__form}>
            <label className={style.label__form}>ImageAlt: </label>
            <input
              type="text"
              value={form.imageAlt}
              onChange={(e) => changeHandler(e)}
              name="imageAlt"
              placeholder="Escribe el imageAlt del producto..."
            />
            {imageAltError && (
              <strong className={style.card__content}>{imageAltError}</strong>
            )}
          </div>
          {/* min */}
          <div className={style.card__form}>
            <label className={style.label__form}>Min: </label>
            <input
              type="text"
              value={form.minError}
              onChange={(e) => changeHandler(e)}
              name="min"
              placeholder="Escribe el Min del producto..."
            />
            {minError && (
              <strong className={style.card__content}>{minError}</strong>
            )}
          </div>

          <div calssName={style.btn}>
            <button
              disabled={
                nameError ||
                priceError ||
                categoryError ||
                brandError ||
                descriptionError ||
                imageAltError ||
                hrefError ||
                minError
              }
              type="submit"
              className={style.btn}
            >
              Create product
            </button>
          </div>
        </form>
      </div>
      <div className={style.buttonReturn}>
        <Link to="/products">
          <button className={style.btnReturn}>Return</button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
