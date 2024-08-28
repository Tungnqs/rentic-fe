import React from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";

export default function LandlordLayout() {
  const navbarItems:INavbarItems[] = [
    {
      path: "/properties",
      title: "Your Property"
    },
    {
      path: "/profile",
      title: "Your Profile"
    }
  ]
  return (
    <div className="block">
      <Navbar navbarItems={navbarItems}/>
      <Outlet />
    </div>
  );
}
