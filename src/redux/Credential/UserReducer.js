import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  MAKE_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./UserActionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
      loading: false,
      isLoggedIn: true,
      user,
      errorMessage: "",
    }
  : {
      loading: false,
      isLoggedIn: false,
      user: null,
      errorMessage: "",
    };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
        errorMessage: "",
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        errorMessage: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        errorMessage: "",
      };
    default:
      return state;
  }
};
