import axios from 'axios';
import {
    GET_PRODUCTS, GET_PRODUCT_NAME,GET_DETAILS,
    FILTER_BY_BRAND, FILTER_CREATED, FILTER_BY_CATEGORY,
    ORDER_BY_PRICE, CLEAR_DETAIL, CLEAR_FILTER,
} from "./action-types";

// Obtener los productos desde la API 
export const getProducts = () => {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/productos');
        return dispatch({
            type: GET_PRODUCTS,
            payload: json.data
        })
    }
};

//Buscar producto por nombre
export function getProductName(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/productos?name=${name}`);
            return dispatch({
                type: GET_PRODUCT_NAME,
                payload: json.data
            })
        } catch (error) {
            alert('Product not found');
        }
    }
}

// Obtener los productos desde la API por ID para obetener el detalle
export function getProductDetails(id) {
    if (id) {
        return async function (dispatch) {
            try {
                const detail = await axios.get(`http://localhost:3001/productos/${id}`);
                dispatch({
                    type: GET_DETAILS,
                    payload: detail.data
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
};

// Filtro para seleccionar productos por marca
export function filterByBrand(brand) { 
    return {
        type: FILTER_BY_BRAND,
        payload: brand
    }
}
// Filtro para seleccionar productos por CATEGORY/ CELULARES O ACCESORIOS
export function filterByCategory(category) { 
    return {
        type: FILTER_BY_CATEGORY,
        payload: category
    }
}

// Ordena por precio
export function orderByPrice(price) {
    return {
        type: ORDER_BY_PRICE,
        payload: price
    }
}

// Para postear el producto
export function postProduct(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/productos', payload);
        return response;
    }
}

// Filtro para seleccionar si fue creado en la Base de datos o viene de la API
export function filterCreated(payload) { //db
    return {
        type: FILTER_CREATED,
        payload
    }
    
}
// Para limpiar el detalle
export function clearDetail() { //db
    return {
        type: CLEAR_DETAIL,
    }
}
    

export function clearFilter() {
    return {
        type: CLEAR_FILTER,
    }
}