// reducers.js
import { combineReducers } from "redux";

const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
