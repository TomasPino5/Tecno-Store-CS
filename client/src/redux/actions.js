import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_DETAILS,
  GET_USER,
  FILTER_BY_BRAND,
  FILTER_CREATED,
  FILTER_BY_CATEGORY,
  ORDER_BY_PRICE,
  CLEAR_DETAIL,
  CLEAR_FILTER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  PUT_USER,
  INCREMENT_SALES,
  MODIFY_PRODUCT,
  DELETE_USER_BY_EMAIL,
} from "./action-types";

// Obtener los productos desde la API
export const getProducts = () => {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/productos");
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
};

//Buscar producto por nombre
export function getProductName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/productos?name=${name}`
      );
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: json.data,
      });
    } catch (error) {
      alert("Product not found");
    }
  };
}

// Obtener los productos desde la API por ID para obetener el detalle
export function getProductDetails(id) {
  if (id) {
    return async function (dispatch) {
      try {
        const detail = await axios.get(`http://localhost:3001/productos/${id}`);
        dispatch({
          type: GET_DETAILS,
          payload: detail.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
}

//action que trae el usuario
export function getUser(email) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/getuser/${email}`);
    const data = json.data;
    dispatch({
      type: GET_USER,
      payload: data,
    });
  };
}

//modifica los datos del usuario en la db
export function putUser(email, user) {
  return async function (dispatch) {
    const json = await axios.put(
      `http://localhost:3001/modifyUser/${email}`,
      user
    );
    const data = json.data;
    dispatch({
      type: PUT_USER,
      payload: data,
    });
  };
}

// Filtro para seleccionar productos por marca
export function filterByBrand(brand) {
  return {
    type: FILTER_BY_BRAND,
    payload: brand,
  };
}
// Filtro para seleccionar productos por CATEGORY/ CELULARES O ACCESORIOS
export function filterByCategory(category) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
}

// Ordena por precio
export function orderByPrice(price) {
  return {
    type: ORDER_BY_PRICE,
    payload: price,
  };
}

// Para postear el producto
export function postProduct(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/productos",
      payload
    );
    return response;
  };
}

// Filtro para seleccionar si fue creado en la Base de datos o viene de la API
export function filterCreated(payload) {
  //db
  return {
    type: FILTER_CREATED,
    payload,
  };
}
// Para limpiar el detalle
export function clearDetail() {
  //db
  return {
    type: CLEAR_DETAIL,
  };
}

export function clearFilter() {
  return {
    type: CLEAR_FILTER,
  };
}

//Cart
export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
}

export function removeFromCart(product) {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}
export function incrementSales() {
  return {
    type: INCREMENT_SALES,
  };
}
export function modifyProduct(productId, updatedProduct) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/productos/${productId}`,
        updatedProduct
      );
      const modifiedProduct = response.data;

      // Aquí puedes manejar las actualizaciones necesarias en el estado
      dispatch({
        type: MODIFY_PRODUCT,
        payload: modifiedProduct,
      });

      // También puedes actualizar los detalles del producto si es necesario
      dispatch(getProductDetails(productId)); // Asegúrate de tener getProductDetails definido
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
}

export function deleteProductByName(name) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/productos/${name}`);
      // You can dispatch an action here if needed after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
}

export function deleteUserByEmail(email) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/user/${email}`);
      // Puedes despachar una acción si es necesario después de la eliminación exitosa
      dispatch({
        type: DELETE_USER_BY_EMAIL,
        payload: email,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
}
