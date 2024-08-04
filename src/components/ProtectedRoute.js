import { Navigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/Credential/UserAction";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const Protected = ({ children }) => {
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);

  if (decodedJwt.exp * 1000 < Date.now()) {
    dispatch(userLogout());
    alert("Sesi anda telah habis silahkan login kembali!");
    window.location.reload(true);
  }
  return children;
};

export const ProtectedFromStudent = ({ children }) => {
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  if (decodedJwt.exp * 1000 < Date.now()) {
    dispatch(userLogout());
    alert("Sesi anda telah habis silahkan login kembali!");
    window.location.reload(true);
  }

  const role = decodedJwt.role;
  if (role != "admin") {
    if (role == "student") {
      return <Navigate to="/student" replace />;
    }
  }

  return children;
};

export const ProtectedFromLecture = ({ children }) => {
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  if (decodedJwt.exp * 1000 < Date.now()) {
    dispatch(userLogout());
    alert("Sesi anda telah habis silahkan login kembali!");
    window.location.reload(true);
  }

  const role = decodedJwt.role;
  if (role != "admin") {
    if (role == "lecture") {
      return <Navigate to="/lecture" replace />;
    }
  }

  return children;
};

export const ProtectedNotFoundPage = ({ children }) => {
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  if (decodedJwt.exp * 1000 < Date.now()) {
    dispatch(userLogout());
    alert("Sesi anda telah habis silahkan login kembali!");
    window.location.reload(true);
  }

  return children;
};
