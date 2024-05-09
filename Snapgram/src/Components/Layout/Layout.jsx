import React from "react";
import Navigation from "../Navigation/Navigation";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <MobileNavigation />
      <Header />
      <div style={{ display: "flex" }}>
        <Navigation />
        <Outlet />
      </div>
    </>
  );
}
