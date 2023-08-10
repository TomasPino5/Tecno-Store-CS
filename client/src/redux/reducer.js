import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_DETAILS,
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  ORDER_BY_PRICE,
  POST_PRODUCT,
  CLEAR_DETAIL,
  CLEAR_FILTER,
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  CLEAR_CART,
  GET_USER,
} from "./action-types";

const initialState = {
  allProductsCopy: [],
  allProducts: [],
  productDetail: [],
  filteredProducts: [],
  filteredProductsCopy: [],
  brands: [],
  categories: [],
  items: [],
  user: []
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
    case GET_USER:
      return{
        ...state,
        user: action.payload
      }  

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

    if (action.payload === "") {
      return {
        ...state,
        allProducts: state.allProductsCopy,
        filteredProducts: state.allProductsCopy,
      };
    }
    return {
      ...state,
      allProducts: state.allProductsCopy.filter((product) => product.brand.includes(action.payload)),
      filteredProducts: state.allProductsCopy.filter((product) => product.brand.includes(action.payload)), 
    };


    case FILTER_BY_CATEGORY:
      
    if (action.payload === "") {
      return {
        ...state,
        allProducts: state.filteredProducts,
      };
    }
    return {
      ...state,
      allProducts: state.filteredProducts.filter(product => product.category === action.payload)
    };


    case ORDER_BY_PRICE: //orden asc y desc
      let priceProducts = [...state.allProducts];
      if (action.payload === "-+") {
        priceProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === "+-") {
        priceProducts.sort((a, b) => b.price - a.price);
      } else if (action.payload === "") {
        priceProducts = [...state.filteredProducts];
      }
      return {
        ...state,
        allProducts: priceProducts,
      };


    case CLEAR_FILTER:
      return {
        ...state,
        allProducts: state.allProductsCopy,
      };
    

    case ADD_TO_CART:
      const { id } = action.payload;
      const productInCartIndex = state.items.findIndex(
        (item) => item.id === id
      );

      if (productInCartIndex >= 0) {
        const newState = [
          ...state.items.slice(0, productInCartIndex),
          {
            ...state.items[productInCartIndex],
            quantity: state.items[productInCartIndex].quantity + 1,
          },
          ...state.items.slice(productInCartIndex + 1),
        ];

        return {
          ...state,
          items: newState,
        };
        // updateLocalStorage(newState)
      }

      const newProduct = {
        ...action.payload, // product
        quantity: 1,
      };

      return {
        ...state,
        items: [...state.items, newProduct],
      };
      // updateLocalStorage(newState)


    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== id)
      };

    case CLEAR_CART:
      return {
        ...state,
        items: []
      };


    default:
      return {
        ...state,
      };
  }
};

export default reducer;
