import React from "react";
import { Navigate } from "react-router-dom";

export default function NotLogin({ children }) {
  const cookie = document.cookie.startsWith("token");
  if (!cookie) {
    return <Navigate to={"/"} />;
  }

  return children;
}
