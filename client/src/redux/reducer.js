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
  INCREMENT_SALES,
  MODIFY_PRODUCT,
  DELETE_PRODUCT_BY_NAME,
  DELETE_USER_BY_EMAIL,
  GET_USER_PURCHASES,
  CLEAR_USER_PURCHASES,
} from "./action-types";

const savedUserData = localStorage.getItem("userData");

const initialState = {
  allProductsCopy: [],
  allProducts: [],
  productDetail: localStorage.getItem("detail")
    ? JSON.parse(localStorage.getItem("detail"))
    : [],
  filteredProducts: [],
  filteredProductsCopy: [],
  brands: [],
  categories: [],
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalPrice: localStorage.getItem("cartTotalPrice")
    ? JSON.parse(localStorage.getItem("cartTotalPrice"))
    : 0,
  user: savedUserData ? JSON.parse(savedUserData) : [],
  salesCount: 0,
  userPurchases: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      const uniqueBrands = Array.from(
        new Set(action.payload.map((product) => product.brand))
      );
      const uniqueCategories = Array.from(
        new Set(action.payload.map((product) => product.category))
      );
      return {
        ...state,
        allProductsCopy: action.payload,
        allProducts: action.payload, //esto es para q los filtros siempre empiecen sobre todos y no sobre el filtro aplicado
        filteredProducts: action.payload,
        brands: uniqueBrands,
        categories: uniqueCategories,
      };

    case GET_PRODUCT_NAME:
      return {
        ...state,
        allProducts: action.payload,
      };

    case GET_DETAILS:
      localStorage.setItem("detail", JSON.stringify(action.payload));
      return {
        ...state,
        productDetail: action.payload,
      };

    case CLEAR_DETAIL:
      localStorage.removeItem("detail");
      return {
        ...state,
        productDetail: [],
      };

    case GET_USER_PURCHASES:
      return {
        ...state,
        userPurchases: action.payload
      }

    case CLEAR_USER_PURCHASES:
      return {
        ...state,
        userPurchases: [],
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
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
        allProducts: state.allProductsCopy.filter((product) =>
          product.brand.includes(action.payload)
        ),
        filteredProducts: state.allProductsCopy.filter((product) =>
          product.brand.includes(action.payload)
        ),
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
        allProducts: state.filteredProducts.filter(
          (product) => product.category === action.payload
        ),
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
      const productInCart = state.items.find((item) => item.id === id);

      if (productInCart) {
        // Verifica si la cantidad en el carrito + 1 no excede el stock máximo
        if (productInCart.quantity + 1 <= productInCart.stock) {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );

          // Calcula el nuevo precio total sumando el precio del producto por su cantidad
          const newTotalPrice = state.totalPrice + productInCart.price;

          // Actualiza el almacenamiento local con los elementos actualizados
          localStorage.setItem("cartItems", JSON.stringify(updatedItems));
          localStorage.setItem("cartTotalPrice", newTotalPrice);

          return {
            ...state,
            items: updatedItems,
            totalPrice: newTotalPrice,
          };
        } else {
          // Si la cantidad en el carrito ya alcanza el stock máximo, no hagas nada
          return state;
        }
      }

      const newProduct = {
        ...action.payload,
        quantity: 1,
      };

      const newTotalPriceAdd = state.totalPrice + newProduct.price;

      // Actualiza el almacenamiento local con los elementos actualizados
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.items, newProduct])
      );
      localStorage.setItem("cartTotalPrice", newTotalPriceAdd);

      return {
        ...state,
        items: [...state.items, newProduct],
        totalPrice: newTotalPriceAdd,
      };

    case REMOVE_FROM_CART:
      const productToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (productToRemove.quantity > 1) {
        const updatedItemsAfterDecrement = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        // Calcula el nuevo precio total restando el precio del producto
        const newTotalPriceAfterDecrement =
          state.totalPrice - productToRemove.price;

        // Actualiza el almacenamiento local con los elementos actualizados
        localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedItemsAfterDecrement)
        );
        localStorage.setItem(
          "cartTotalPrice",
          JSON.stringify(newTotalPriceAfterDecrement)
        );

        return {
          ...state,
          items: updatedItemsAfterDecrement,
          totalPrice: newTotalPriceAfterDecrement,
        };
      } else {
        // Elimina el producto del carrito si la cantidad es 1
        const updatedItemsAfterRemove = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        // Calcula el nuevo precio total restando el precio del producto
        const newTotalPriceAfterRemove =
          state.totalPrice - productToRemove.price;

        // Actualiza el almacenamiento local con los elementos actualizados
        localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedItemsAfterRemove)
        );
        localStorage.setItem(
          "cartTotalPrice",
          JSON.stringify(newTotalPriceAfterRemove)
        );

        return {
          ...state,
          items: updatedItemsAfterRemove,
          totalPrice: newTotalPriceAfterRemove,
        };
      }

    case CLEAR_CART:
      // Limpia los elementos del carrito y también del almacenamiento local
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotalPrice");

      return {
        ...state,
        items: [],
        totalPrice: 0,
      };
    case INCREMENT_SALES:
      return {
        ...state,
        salesCount: state.salesCount + 1,
      };

    case MODIFY_PRODUCT:
      // Encuentra el índice del producto a modificar en tu estado actual
      const productIndex = state.allProducts.findIndex(
        (product) => product.id === action.payload.id
      );

      // Si encontraste el producto, actualiza el estado
      if (productIndex !== -1) {
        const updatedProducts = [...state.allProducts];
        updatedProducts[productIndex] = action.payload;

        return {
          ...state,
          allProducts: updatedProducts,
          // Puedes manejar otros casos si es necesario
        };
      }

      // Si no se encontró el producto, devuelve el estado sin cambios
      return state;

    case DELETE_PRODUCT_BY_NAME:
      // Puedes implementar esta parte según la estructura de tu estado
      // Por ejemplo, si almacenas los productos como un array en tu estado
      const updatedProducts = state.allProducts.filter(
        (product) => product.name !== action.payload
      );
      return {
        ...state,
        allProducts: updatedProducts,
      };

    case DELETE_USER_BY_EMAIL:
      const updatedUsers = state.user.filter(
        (user) => user.email !== action.payload
      );
      return {
        ...state,
        user: updatedUsers,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
