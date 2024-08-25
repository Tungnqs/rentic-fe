import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export default function LandlordLayout() {
  return (
    <div className="block">
      <div>LandlordLayout</div>
      <div>LandlordLayout</div>
      <div>LandlordLayout</div>
      <div>LandlordLayout</div>
      <Navbar />
      <Outlet />
    </div>
  );
}
