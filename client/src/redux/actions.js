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
  GET_USER_PURCHASES,
  CLEAR_USER_PURCHASES,
  TOGGLE_DARK_MODE,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  GET_ALL_USERS,
  USER_ACTIVE,
  GET_COMPRAS,
} from "./action-types";


// Obtener los productos desde la API
export const getProducts = () => {
  return async function (dispatch) {
    const json = await axios.get("/productos");
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
};


// Obtener las compras del usuario desde la API
export function getUserPurchases(email) {
  return async function (dispatch) {
    const json = await axios.get(`/getUserPurchases/${email}`);
    const data = json.data;
    dispatch({
      type: GET_USER_PURCHASES,
      payload: data,
    });
  };
}


// Para limpiar compras del usuario
export function clearUserPurchases() {
  return {
    type: CLEAR_USER_PURCHASES,
  };
}


//Buscar producto por nombre
export function getProductName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `/productos?name=${name}`
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
        const detail = await axios.get(`/productos/${id}`);
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
    const json = await axios.get(`/getuser/${email}`);
    const data = json.data;
    dispatch({
      type: GET_USER,
      payload: data,
    });
  };
}

//actiona para trar las compras del usuario
export function getCompras() {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/compras');
    const compra = response.data;
    dispatch({
      type: GET_COMPRAS,
      payload: compra
    });
  }
}

//modifica los datos del usuario en la db
export function putUser(email, user) {
  return async function (dispatch) {
    const json = await axios.put(
      `/modifyUser/${email}`,
      user
    );
    const data = json.data;
    dispatch({
      type: PUT_USER,
      payload: data,
    });
  };
}

export function userActive(id) {
  return async function (dispatch) {
    const json = await axios.put(`/putuser/${id}`);
    const data = json.data;
    dispatch({
      type: USER_ACTIVE,
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
      "/productos",
      payload
    );
    return response;
  };
}

// Para postear el un usuario
export function postUser(userData) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/login', userData);
    return response;
  };
}


// Para guardar la compra del usuario
export function postUserPurchase(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "/userPurchase",
      payload
    );
    return response;
  }
}

// Modifica stock con la compra
export function postNewStock(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/actualizarStock",
      payload
    );
    return response;
  }
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
        `/productos/${productId}`,
        updatedProduct
      );
      const modifiedProduct = response.data;
      // Aquí puedes manejar las actualizaciones necesarias en el estado
      dispatch({
        type: MODIFY_PRODUCT,
        payload: modifiedProduct,
      });

      // // También puedes actualizar los detalles del producto si es necesario
      // dispatch(getProductDetails(productId)); // Asegúrate de tener getProductDetails definido
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
}


export function deleteProductByName(name) {
  return async function (dispatch) {
    try {
      await axios.delete(`/productos/${name}`);
      // You can dispatch an action here if needed after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
}


export function deleteUserByEmail(email) {
  return async function (dispatch) {
    try {
      await axios.delete(`/user/${email}`);
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

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export function addToFavorite(product) {
  return {
    type: ADD_TO_FAVORITE,
    payload: product,
  };
}

export function removeFromFavorite(product) {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: product,
  };
}
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/allusers");
      const users = response.data;

      dispatch({
        type: GET_ALL_USERS,
        payload: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
