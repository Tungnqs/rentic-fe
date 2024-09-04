import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllMyPosts } from "../../store/slices/post.slice";

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
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllMyPosts());
  }, []);

  return (
    <div className="block">
      <Navbar navbarItems={navbarItems}/>
      <Outlet />
    </div>
  );
}
