import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_DETAILS,
  FILTER_BY_BRAND,
  FILTER_CREATED,
  FILTER_BY_CATEGORY,
  ORDER_BY_PRICE,
  POST_PRODUCT,
  CLEAR_DETAIL,
} from "./action-types";

const initialState = {
  allProductsCopy: [],
  allProducts: [],
  productDetail: [],
  brands: ["Motorola", "Samsung", "Xiomi", "Iphone"],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProductsCopy: action.payload,
        allProducts: action.payload, //esto es para q los filtros siempre empiecen sobre todos y no sobre el filtro aplicado
      };

    case GET_PRODUCT_NAME:
      return {
        ...state,
        allProductsCopy: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        productDetail: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        productDetail: [],
      };

    case POST_PRODUCT:
      return {
        ...state,
      };

    case FILTER_CREATED:
      let filterCreated;

      if (action.payload === "All") {
        filterCreated = state.allProducts;
      } else {
        filterCreated =
          action.payload === "Created"
            ? state.allProducts.filter((el) => el.createdInDB)
            : state.allProducts.filter((el) => !el.createdInDB);
      }
      return {
        ...state,
        allProductsCopy: filterCreated,
      };

    case FILTER_BY_BRAND:
      let filterBrand;

      if (action.payload === "All") {
        filterBrand = state.allProducts;
      } else if (action.payload === "Motorola") {
        filterBrand = state.allProducts.filter((el) => el.brand === "Motorola");
      } else if (action.payload === "Apple") {
        filterBrand = state.allProducts.filter((el) => el.brand === "Apple");
      } else if (action.payload === "Samsung") {
        filterBrand = state.allProducts.filter((el) => el.brand === "Samsung");
      } else if (action.payload === "Xiaomi") {
        filterBrand = state.allProducts.filter((el) => el.brand === "Xiaomi");
      }

      return {
        ...state,
        allProductsCopy: filterBrand,
      };

    case FILTER_BY_CATEGORY:
      let filterCategory;

      if (action.payload === "All") {
        filterCategory = state.allProducts;
      } else if (action.payload === "Auricular") {
        filterCategory = state.allProducts.filter(
          (el) => el.category === "Auricular"
        );
      } else if (action.payload === "Celulares") {
        filterCategory = state.allProducts.filter(
          (el) => el.category === "Celulares"
        );
      }

      return {
        ...state,
        allProductsCopy: filterCategory,
      };



      case ORDER_BY_PRICE: //orden asc y desc
            let sortPrice = action.payload === 'Asc' ?
                state.allProductsCopy.sort(function (a, b) {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (b.price > a.price) {
                        return -1;
                    }
                    return 0; // si son iguales los deja como esta
                })
                : state.allProductsCopy.sort(function (a, b) {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (b.price > a.price) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                allProductsCopy: sortPrice,
            };






    default:
      return state;
  }
};

export default reducer;
