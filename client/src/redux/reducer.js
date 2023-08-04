import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_DETAILS,
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  ORDER_BY_PRICE,
  POST_PRODUCT,
  CLEAR_DETAIL,
  CLEAR_FILTER
} from "./action-types";

const initialState = {
  allProductsCopy: [],
  allProducts: [],
  productDetail: [],
  filteredProducts: [],
  filteredProductsCopy: [],
  brands: [],
  categories: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      const uniqueBrands = Array.from(new Set(action.payload.map((product) => product.brand)))
      const uniqueCategories = Array.from(new Set(action.payload.map((product) => product.category)))
      return {
        ...state,
        allProductsCopy: action.payload,
        allProducts: action.payload, //esto es para q los filtros siempre empiecen sobre todos y no sobre el filtro aplicado
        filteredProducts: action.payload,
        brands: uniqueBrands,
        categories: uniqueCategories
      };

    case GET_PRODUCT_NAME:
      return {
        ...state,
        allProducts: action.payload,
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


    case FILTER_BY_BRAND:

      // let filteredByBrand

      // if (action.payload === 'Motorola') {
      //   filteredByBrand = state.filteredProducts.filter(product => product.brand === action.payload)
      // }
      // else if (action.payload === 'Xiaomi') {
      //   filteredByBrand = state.filteredProducts.filter(product => product.brand === action.payload)
      // }
      // else if (action.payload === 'Apple') {
      //   filteredByBrand = state.filteredProducts.filter(product => product.brand === action.payload)
      // }
      // else if (action.payload === 'Samsung') {
      //   filteredByBrand = state.filteredProducts.filter(product => product.brand === action.payload)
      // }
      // else {
      //   filteredByBrand = state.filteredProducts
      // }

      // return {
      //   ...state,
      //   filteredProducts: filteredByBrand
      // }

      const brandProducts = [...state.allProductsCopy];

      let filteredByBrand

      if (action.payload === "All") {
        filteredByBrand = brandProducts
      }
      else {
        filteredByBrand = state.allProductsCopy.filter((product) => product.brand.includes(action.payload))
      }
      return {
        ...state,
        filteredProducts: filteredByBrand
        // allProducts: state.allProductsCopy.filter((product) =>
        //   product.brand.includes(action.payload)
        // ),
      };


    case FILTER_BY_CATEGORY:
      
      const categoryProducts = [...state.allProductsCopy];

      let filteredByCategory

      if (action.payload === "All") {
        filteredByCategory = categoryProducts
      }
      else {
        filteredByCategory = state.allProductsCopy.filter((product) => product.category.includes(action.payload))
      }
      return {
        ...state,
        filteredProducts: filteredByCategory
        // allProducts: state.allProductsCopy.filter((product) =>
        //   product.category.includes(action.payload)
        // ),
        // filteredProducts: state.allProductsCopy.filter((product) =>
        //   product.category.includes(action.payload)
        // ),
      };


    case ORDER_BY_PRICE: //orden asc y desc
      let priceProducts = [...state.filteredProducts];
      if (action.payload === "-+") {
        priceProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === "+-") {
        priceProducts.sort((a, b) => b.price - a.price);
      } else if (action.payload === "") {
        priceProducts = [...state.filteredProducts];
      }
      return {
        ...state,
        filteredProducts: priceProducts,
      };


    case CLEAR_FILTER:
      return {
        ...state,
        filteredProducts: state.allProductsCopy,
      };


    default:
      return {
        ...state,
      };
  }
};

export default reducer;
