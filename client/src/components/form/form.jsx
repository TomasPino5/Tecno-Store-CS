import React from "react";
import { useState } from "react";
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
  const [errors, setErrors] = useState({
    name: "The name is required",
    imageSrc: "",
    price: "The price is required",
    stock: "The stock is required",
    brand: "The brand is required",
    category: "The category is required",
    description: "The description is required",
  });

  function validate(form) {
    const error = {};

    if (form.name.length < 1) {
      error.name = "The name is required!";
    }
    if (form.price < 1) {
      error.price = "The price is required!";
    }
    if (form.stock < 0) {
      error.stock = "The stock is required!";
    }
    if (form.brand.length < 1) {
      error.brand = "The brand is required!";
    }
    if (form.category.length < 1) {
      error.category = "The category is required!";
    }
    if (form.description.length < 1) {
      error.description = "The description is required!";
    }
    return error;
  }
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setErrors(
      validate({
        ...form,
        [property]: value,
      })
    );
    setForm({
      ...form,
      [property]: value,
    });
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
        <Link to="/home">
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
            {errors.name && (
              <strong className={style.card__content}>{errors.name}</strong>
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
            {/* {errors.image && <strong className={style.card__content}>{errors.image}</strong} */}
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
            {errors.price && (
              <strong className={style.card__content}>{errors.price}</strong>
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
            {errors.stock && (
              <strong className={style.card__content}>{errors.stock}</strong>
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
            {errors.brand && (
              <strong className={style.card__content}>{errors.brand}</strong>
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
            {errors.category && (
              <strong className={style.card__content}>{errors.category}</strong>
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
            {errors.description && (
              <strong className={style.card__content}>
                {errors.description}
              </strong>
            )}
          </div>
          <div calssName={style.btn}>
            <button
              disabled={
                errors.name ||
                errors.price ||
                errors.category ||
                errors.brand ||
                errors.description
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
