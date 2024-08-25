import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export default function RenterLayout() {
  return (
    <div className="block">
      <div>RenterLayout</div>
      <Navbar />
      <Outlet />
    </div>
  );
}
