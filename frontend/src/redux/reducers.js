// reducers.js
import { combineReducers } from 'redux';

function userReducer(state = { user: null }, action) {
  console.log('[USER_REDUCER] ' + action.payload);
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

/*
{
  id: productId,
  quantity: productQuantity,
  name: productName,
  image: productImgBuffer,
  desc: productDesc
}
*/

function cartReducer(
  state = { cart: [], totalPrice: 0, totalDiscount: 0 },
  action
) {
  console.log('[CART_REDUCER] ', action.payload);
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // If item already exists in the cart, update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If item doesn't exist in the cart, add it
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.productId) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}

const calculateTotals = (cart) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  for (const item of cart) {
    totalPrice += item.quantity * (item.price - item.discount);
    totalDiscount += item.quantity * item.discount;
  }
  return { totalPrice, totalDiscount };
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default function (state, action) {
  const newState = rootReducer(state, action);
  const { cart } = newState;
  const { totalPrice, totalDiscount } = calculateTotals(newState.cart.cart);
  return {
    ...newState,
    cart: {
      ...cart,
      totalPrice,
      totalDiscount,
    },
  };
}
