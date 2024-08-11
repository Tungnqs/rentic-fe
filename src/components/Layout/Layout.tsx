import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import LeftNavBar from "../LeftNavBar/LeftNavBar";

export default function Layout() {
  return (
    <div className="block">
      <Navbar />
      {/* <LeftNavBar /> */}
      <Outlet />
    </div>
  );
}
