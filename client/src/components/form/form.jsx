import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../redux/actions";
import style from "./form.module.css";
//
import axios from 'axios';

// const Form = () => {
//   const dispatch = useDispatch();
//   let navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     href: "", //agregado
//     imageSrc: "",
//     imageAlt: "", //agregado
//     price: 0,
//     brand: "",
//     min: 0, //agregado
//     stock: 0,
//     category: "",
//     description: "",
//   });

// const [nameError, setNameError] = useState("");
// const [priceError, setPriceError] = useState("");
// const [stockError, setStockError] = useState("");
// const [brandError, setBrandError] = useState("");
// const [ImageSrcError, setImageSrcError] = useState("");
// const [categoryError, setCategoryError] = useState("");
// const [descriptionError, setDescriptionError] = useState("");
// const [imageAltError, setImageAltError] = useState("");
// const [hrefError, setHrefError] = useState("");
// const [minError, setMinError] = useState("");

// const validateName = (name) => {
//   //setNameError(name.trim() === "" ? "¡Se requiere el nombre!" : "");
//   if (name.length < 5){
//     setNameError('¡Se requiere el nombre!')
//   }
// };

// const validatePrice = (price) => {
//   setPriceError(
//     price.trim() === "" || isNaN(price) || Number(price) <= 0
//       ? "¡Por favor ingresa un precio válido!"
//       : ""
//   );

// };

// const validateStock = (stock) => {
//   setStockError(
//     stock.trim() === "" || isNaN(stock) || Number(stock) < 0
//       ? "¡Por favor ingresa una cantidad de stock válida!"
//       : ""
//   );
// };

// const validateBrand = (brand) => {
//   setBrandError(brand.trim() === "" ? "¡Se requiere la marca!" : "");
// };

// const validateImgSrc = (imageSrc) => {
//   if (!imageSrc) {
//     setImageSrcError(
//       "¡Por favor ingresa una img válida!"
//     );
//   }
// };

// const validateCategory = (category) => {
//   setCategoryError(
//     category.trim() === "" ? "¡Se requiere la categoría!" : ""
//   );
// };

// const validateDescription = (description) => {
//   setDescriptionError(
//     description.trim() === "" ? "¡Se requiere la descripción!" : ""
//   );
// };
// // aca agrego las 3 faltantes
// const validateImgAlt = (imageAlt) => {
//   setImageAltError(
//     imageAlt.trim() === "" ? "¡Se requiere el Alt de la imagen!" : ""
//   );
// };

// const validateHref = (href) => {
//   setHrefError(href.trim() === "" ? "¡Se requiere href!" : "");
// };
// const validateMin = (min) => {
//   setMinError(min.trim() === "" ? "¡Se requiere el min!" : "");
// };

// const changeHandler = (event) => {
//   const property = event.target.name;
//   const value = event.target.value;

//   setForm({
//     ...form,
//     [property]: value,
//   });

//   switch (property) {
//     case "name":
//       validateName(value);
//       break;

//     case "price":
//       validatePrice(value);
//       break;
//     case "stock":
//       validateStock(value);
//       break;
//     case "brand":
//       validateBrand(value);
//       break;
//     case "category":
//       validateCategory(value);
//       break;
//     case "description":
//       validateDescription(value);
//       break;
//     case "imageSrc":
//       validateImgSrc(value);
//       break;
//     case "min":
//       validateMin(value);
//       break;
//     case "imageAlt":
//       validateImgAlt(value);
//       break;
//     case "href":
//       validateHref(value);
//       break;
//     default:
//       break;
//   }
// };

// const submitHandler = (event) => {
  //   event.preventDefault();
  //   dispatch(postProduct(form));
  //   alert("Has creado un nuevo producto");
//   setForm({
  //     name: "",
//     href: "",
//     imageSrc: "",
//     imageAlt: "",
//     price: "",
//     brand: "",
//     min: "",
//     stock: "",
//     category: "",
//     description: "",
//   });
//   navigate("/");
// };

const Form = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  
  const [form, setForm] = useState({
    name: "",
    href: "", //agregado
    imageSrc: "",
    imageAlt: "", //agregado
    price: 0,
    brand: "",
    min: 0, //agregado
    stock: 0,
    category: "",
    description: "",
  });
  
  const [error, setError] = useState({
    name: "¡Se requiere el nombre!",
    href: "¡Se requiere #!",
    imageSrc: "¡Se requiere la imagen!",
    imageAlt: "¡Se requiere el imageAlt!",
    price: '¡Por favor ingresa un precio válido!',
    brand: "¡Se requiere el brand!",
    min: "¡Se requiere el min!",
    stock: "¡Se requiere el stock!",
    category: "¡Por favor ingresa una category!",
    description: "¡Por favor ingresa una description!"
  })

  
  function validate(form) {
    const error = {}
    if (form.name.length < 5) {
      error.name = 'The name is required!'
    }
    if (!form.imageSrc) {
      error.imageSrc = '¡Se requiere el imageSrc!'
    }
    if (form.href.length < 0) {
      error.href = '¡Se requiere el href!'
    }
    
    if (form.imageAlt !== form.name) {
      error.imageAlt = 'Debe ser igual al name!'
    }
    if (form.price < 1) {
      error.price = '¡Por favor ingresa un precio válido!'
    }
    if (form.brand === "" || form.brand === null) {
      error.brand = '¡Se requiere el brand!'
    }
    if (form.min < 1) {
      error.min = 'No puede ser menor a 1!'
    }
    if (form.stock < 1) {
      error.stock = 'No puede ser menor a 1!'
    }
    if (form.category === "" || form.brand === null) {
      error.category = '¡Por favor ingresa una category!'
    }
    if (form.description.length < 10) {
      error.description = 'La descripcion debe ser mas larga!'
    }
    return error
  }
  
  
  
  // Carga imagen ibb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "ccc0eb65a71efd80b4352eda77e05470"); // Replace with your ImgBB API key
    
    try {
      const response = await axios.post("https://api.imgbb.com/1/upload", formData);
      const imageUrl = response.data.data.url;
      console.log(imageUrl)
      setForm({
        ...form,
        imageSrc: imageUrl
      });
      setError(validate({
        ...form,
        imageSrc: imageUrl
      }));
      //setImageSrcError(""); // Clear the imageSrc error if any
    } catch (error) {
      // console.error("Error uploading image:", error);
      //setImageSrcError("Failed to upload image. Please try again.");
      
    }
  };
  
  // funcion select brand
  const handleSelectBrand = (event) => {
    setForm({
      ...form,
      brand: event.target.value
    });
    setError(validate({
      ...form,
      brand: event.target.value
    }));
  }
  
  // funcion select category
  const handleSelectCategory = (event) => {
    setForm({
      ...form,
      category: event.target.value
    });
    setError(validate({
      ...form,
      category: event.target.value
    }));
  }
  
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
      
    })
    setError(validate({
      ...form,
      [event.target.name]: event.target.value
    }))
  }
  console.log(form.imageSrc)
  
  
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

  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);

  const [newbrand, setNewbrand] = useState(false);
  const [newcategory, setNewCategory] = useState(false);

  const handleInputBrand = ()=>{
    setNewbrand(true);
  }

  const handleInputCategory = ()=>{
    setNewCategory(true);
  }

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
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="name"
              placeholder="Escribe el nombre del producto..."
            />
            {error.name && (
              <strong className={style.card__content}>{error.name}</strong>
            )}
          </div>


          {/* <div className={style.card__form}>
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
          </div> */}
          <div >
            <label className={style.label__form}>Imagen del producto: </label>
            <input
              type="file" // Cambia el tipo de entrada a "file" para permitir la selección de imágenes
              onChange={(e) => handleImageUpload(e)} // Llama a la función handleImageUpload cuando cambie la imagen
              name="imageSrc"
              accept="image/*" // Restringe la selección de archivos a imágenes solamente
            />
            {error.imageSrc && (
              <strong className={style.card__content}>{error.imageSrc}</strong>
            )}
            {form.imageSrc && (
              <img
                src={form.imageSrc}
                alt="Producto"
                className={style.uploadedImage}
              />
            )}
          </div>



          <div className={style.card__form}>
            <label className={style.label__form}>Price: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="price"
              placeholder="Escribe el precio del producto..."
            />
            {error.price && (
              <strong className={style.card__content}>{error.price}</strong>
            )}
          </div>



          <div className={style.card__form}>
            <label className={style.label__form}>Stock: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="stock"
              placeholder="Escribe la cantidad de stock..."
            />
            {error.stock && (
              <strong className={style.card__content}>{error.stock}</strong>
            )}
          </div>



          {/* <div className={style.card__form}>
            <label className={style.label__form}>Brand: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="brand"
              placeholder="Escribe la marca del producto..."
            />
            {error.brand && (
              <strong className={style.card__content}>{error.brand}</strong>
            )}
          </div> */}

          <div >
            <label className={style.label__form}>Brand: </label>
            <select onChange={handleSelectBrand}>
              <option value="">Brands</option>
              {brands.map(brand=>(<option value={brand}>{brand}</option>))}
            </select>
              <div onClick={handleInputBrand}>New Brand</div>
            {
              newbrand === true?<input type="text" name="brand" value={form.value}
              onChange={(e) => changeHandler(e)} placeholder="add new brand"/>:null
            }
            {error.brand && (
              <strong className={style.card__content}>{error.brand}</strong>
            )}
          </div>





          {/* <div className={style.card__form}>
            <label className={style.label__form}>Category: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="category"
              placeholder="Escribe la categoría del producto..."
            />
            {error.category && (
              <strong className={style.card__content}>{error.category}</strong>
            )}
          </div> */}

          <div >
            <label className={style.label__form}>Category: </label>
            <select onChange={handleSelectCategory}>
              <option value="">Category</option>
              {categories.map(category=>(<option value={category}>{category}</option>))}
            </select>
            <div onClick={handleInputCategory}>New Category</div>
            {
              newcategory=== true?<input type="text" name="category" value={form.value}
              onChange={(e) => changeHandler(e)} placeholder="add new Category"/>:null
            }
            {error.category && (
              <strong className={style.card__content}>{error.category}</strong>
            )}
          </div>



          <div className={style.card__form}>
            <label className={style.label__form}>Description: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="description"
              placeholder="Escribe la descripción del producto..."
            />
            {error.description && (
              <strong className={style.card__content}>
                {error.description}
              </strong>
            )}
          </div>

          {/* ACA VAN LAS 3 PROPIEDADES FALTANTES  */}

          {/* HREF */}
          <div className={style.card__form}>
            <label className={style.label__form}>Href: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="href"
              placeholder="Escribe el href del producto..."
            />
            {error.href && (
              <strong className={style.card__content}>{error.href}</strong>
            )}
          </div>


          {/* imageAlt */}
          <div className={style.card__form}>
            <label className={style.label__form}>ImageAlt: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="imageAlt"
              placeholder="Escribe el imageAlt del producto..."
            />
            {error.imageAlt && (
              <strong className={style.card__content}>{error.imageAlt}</strong>
            )}
          </div>


          {/* min */}
          <div className={style.card__form}>
            <label className={style.label__form}>Min: </label>
            <input
              type="text"
              value={form.value}
              onChange={(e) => changeHandler(e)}
              name="min"
              placeholder="Escribe el Min del producto..."
            />
            {error.min && (
              <strong className={style.card__content}>{error.min}</strong>
            )}
          </div>


          {error.imageSrc || error.name || error.price || error.category || error.brand || error.description || error.imageAlt || error.href || error.min ? null : <button className={style.btn} type='submit'>Create product</button>}
          {/* <div calssName={style.btn}>

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
          </div> */}
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
