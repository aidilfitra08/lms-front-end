import { Navigate } from "react-router-dom";
import React from "react";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const Protected = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  const role = decodedJwt.role;
  // let role = JSON.parse(localStorage.getItem("user")).role;
  if (role != "student" && role != "admin") {
    return <Navigate to="/lecture" replace />;
  } else if (role != "lecture" && role != "admin") {
    return <Navigate to="/student" replace />;
  }
  return children;
};

export const ProtectedFromStudent = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  const role = decodedJwt.role;
  if (role != "admin") {
    if (role == "student") {
      return <Navigate to="/student" replace />;
    }
  }

  return children;
};

export const ProtectedFromLecture = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  const role = decodedJwt.role;
  if (role != "admin") {
    if (role == "lecture") {
      return <Navigate to="/lecture" replace />;
    }
  }

  return children;
};

export const ProtectedNotFoundPage = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
