import { Navigate } from "react-router-dom";
import React from "react";

const Protected = ({ children }) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
