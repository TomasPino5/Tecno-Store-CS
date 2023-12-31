import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_DETAILS,
  GET_USER,
  GET_PRODUCT_RATINGS,
  GET_USER_RATINGS,
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
  USER_ADMIN,
  DELETE_CART_PAY
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
      //alert("Product not found");
      Swal.fire({
        title: "No Existe!",
        text: "No se ha encontrado producto con ese nombre.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#28a745",
      })
    };
  }
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
    const response = await axios.get('/compras');
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

export function userAdmin(id) {
  return async function (dispatch) {
    const json = await axios.put(`/putadmin/${id}`);
    const data = json.data;
    dispatch({
      type: USER_ADMIN,
      payload: data
    })
  }
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
    const response = await axios.post('/login', userData);
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
      "/actualizarStock",
      payload
    );
    return response;
  }
}

// Para guardar la calificacion del usuario
export function rateProduct(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "/rateProduct",
      payload
    );
    return response;
  }
}

// Para modificar la calificacion del usuario
export function modifyUserRating(email, productId, payload) {
  return async function (dispatch) {
    const response = await axios.put(
      `/modifyUserRating?email=${email}&productId=${productId}`,
      payload
    );
    return response;
  }
}

// Para trer las calificaciones del producto
export function productRatings(productId) {
  return async function (dispatch) {
    const json = await axios.get(`/getRating?productId=${productId}`);
    const data = json.data;
    dispatch({
      type: GET_PRODUCT_RATINGS,
      payload: data,
    });
  };
}


// Para trer las calificaciones del usuario
export function getUserRatings(email) {
  return async function (dispatch) {
    const json = await axios.get(`/getRating?email=${email}`);
    const data = json.data;
    dispatch({
      type: GET_USER_RATINGS,
      payload: data,
    });
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

// export function addToFavorite(product) {
//   return {
//     type: ADD_TO_FAVORITE,
//     payload: product,
//   };
// }

// Para guardar la fav del usuario
export function postFav(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "/postFav",
      payload
    );
    return response;
  }
}

// Obtener los favs del usuario desde la db
export function getUserFavs(email) {
  return async function (dispatch) {
    const json = await axios.get(`/getUserFavs/${email}`);
    const data = json.data;
    dispatch({
      type: ADD_TO_FAVORITE,
      payload: data,
    });
  };
}

// export function removeFromFavorite(product) {
//   return {
//     type: REMOVE_FROM_FAVORITE,
//     payload: product,
//   };
// }

export const removeFromFavorite = (email, id) => {
  return async function (dispatch) {
    const json = await axios.delete(`/deleteUserFav?email=${email}&productId=${id}`);
    const data = json.data;
    dispatch({
      type: REMOVE_FROM_FAVORITE,
      payload: data,
    });
  };
};

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


export const deleteCartPay = (product) => {
  return {
    type: DELETE_CART_PAY,
    payload: product,
  };
}