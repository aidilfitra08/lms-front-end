import {
  ADD_PROFILE_STATE,
  FAIL_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  MAKE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_REQUEST,
} from "./UserActionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
      loading: false,
      isLoggedIn: true,
      user,
      errorMessage: "",
      profile: {
        name: "",
        email: "",
        mobileNumber: "",
        dateBirth: "",
        gender: "",
        address: "",
        profilePicture: "",
      },
    }
  : {
      loading: false,
      isLoggedIn: false,
      isRegistered: false,
      user: null,
      message: "",
      errorMessage: "",
    };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case REGISTER_SUCCESS:
      state.errorMessage = "";
      state.isRegistered = true;

      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isRegistered: false,
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

    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        errorMessage: "",
      };

    case SUCCESS_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };

    case ADD_PROFILE_STATE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
