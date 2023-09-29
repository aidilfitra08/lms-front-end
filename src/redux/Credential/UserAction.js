import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  MAKE_REQUEST,
  REGISTER_SUCCESS,
  USER_REGISTER,
} from "./UserActionTypes";

const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerFail = (error) => {
  return {
    type: REGISTER_SUCCESS,
    errorMessage: error,
  };
};

export const userLogout = () => {
  localStorage.removeItem("user");
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const userLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    await axios
      .post(process.env.REACT_APP_BASE_URL + "/apiv1/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.payload.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data.payload));
        }
        console.log(res.data.payload);
        dispatch(loginSuccess(res.data.payload));
      })
      .catch((error) => {
        // console.log(error.response.status);
        dispatch(loginFail(error.response.data.message));
      });
  };
};
