import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import LeftNavBar from "../LeftNavBar/LeftNavBar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <LeftNavBar />
      <Outlet />
    </div>
  );
}
