import React from "react";
import { Navigate } from "react-router-dom";

export default function Loggedin({ children }) {
  const cookie = document.cookie.startsWith("token");
  if (cookie) {
    return <Navigate to={"/Deshboard"} />;
  }

  return children;
}
