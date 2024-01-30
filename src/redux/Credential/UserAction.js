import axios from "axios";
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

const registerSuccess = (status) => {
  return {
    type: REGISTER_SUCCESS,
    payload: status,
  };
};

const registerFail = (error) => {
  return {
    type: REGISTER_FAIL,
    payload: error,
  };
};

const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};
const successRequest = () => {
  return {
    type: SUCCESS_REQUEST,
  };
};
const profileDetail = (data) => {
  return {
    type: PROFILE_REQUEST_SUCCESS,
    payload: data,
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
        dispatch(loginSuccess(res.data.payload));
      })
      .catch((error) => {
        // console.log(error.response.status);
        // if (error.response.data.message) {
        //   dispatch(loginFail(error.response.data.message));
        // } else {
        dispatch(loginFail(error.response.data.message));
        // }
      });
  };
};

export const userRegister = (name, email, password) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    await axios
      .post(process.env.REACT_APP_BASE_URL + "/apiv1/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        // if (res.data.payload.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(res.data.payload));
        // }
        dispatch(registerSuccess(res.status));
      })
      .catch((error) => {
        // console.log(error.response.status);
        // if (error.response.data.message) {
        //   dispatch(loginFail(error.response.data.message));
        // } else {
        dispatch(registerFail(error.response.data.message));
        // }
      });
  };
};

export const fetchProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return async (dispatch) => {
    dispatch(makeRequest());
    await axios
      .get(process.env.REACT_APP_BASE_URL + "/apiv1/profile", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          dispatch(profileDetail(res.data.payload));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const addProfile = (profileData) => {
  return {
    type: ADD_PROFILE_STATE,
    payload: profileData,
  };
};

export const editProfile = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return async (dispatch) => {
    dispatch(makeRequest());
    await axios
      .put(process.env.REACT_APP_BASE_URL + "/apiv1/profile", data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 201) {
          dispatch(successRequest());
          alert("Profile berhasil di update.");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        alert(err.response.data.message);
        window.location.reload(true);
      });
  };
};
