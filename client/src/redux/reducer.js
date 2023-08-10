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

const savedUserData = localStorage.getItem('userData');

const initialState = {
  allProductsCopy: [],
  allProducts: [],
  productDetail: [],
  filteredProducts: [],
  filteredProductsCopy: [],
  brands: [],
  categories: [],
  items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  totalPrice: localStorage.getItem('cartTotalPrice') ? JSON.parse(localStorage.getItem('cartTotalPrice')) : 0,
  user: savedUserData ? JSON.parse(savedUserData) : [],
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
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
      
          // Actualiza el almacenamiento local con los elementos actualizados
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      
          return {
            ...state,
            items: updatedItems,
          };
        }
      
        const newProduct = {
          ...action.payload,
          quantity: 1,
        };
      
        const newTotalPriceAdd = state.totalPrice + newProduct.price;

        // Actualiza el almacenamiento local con los elementos actualizados
        localStorage.setItem('cartItems', JSON.stringify([...state.items, newProduct]));
        localStorage.setItem('cartTotalPrice', newTotalPriceAdd);
      
        return {
          ...state,
          items: [...state.items, newProduct],
          totalPrice: newTotalPriceAdd,
        };


      
      
      case REMOVE_FROM_CART:
        const updatedItems = state.items.filter((item) => item.id !== action.payload);
      
        // Actualiza el almacenamiento local con los elementos actualizados
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      
        return {
          ...state,
          items: updatedItems,
      };
      
      case CLEAR_CART:
        // Limpia los elementos del carrito y también del almacenamiento local
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotalPrice');
      
        return {
          ...state,
          items: [],
          totalPrice: 0,
      };


    default:
      return {
        ...state,
      };
  }
};

export default reducer;
