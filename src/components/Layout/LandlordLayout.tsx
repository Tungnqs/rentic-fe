import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllMyPosts } from "../../store/slices/post.slice";
import { AppointmentIcon, MessageIcon, ProfileIcon, PropertyIcon } from "../../assets/icon/icon";

export default function LandlordLayout() {
  const navbarItems:INavbarItems[] = [
    {
      path: "/properties",
      title: "Your Property",
      icon: <PropertyIcon className="w-full"/>
    },
    {
      path: "/profile",
      title: "Your Profile",
      icon: <ProfileIcon className="w-full"/>
    },
    {
      path: "/appointments",
      title: "Appointments",
      icon: <AppointmentIcon className="w-full"/>
    },
    {
      path: "/conversations",
      title: "Conversations",
      icon: <MessageIcon className="w-full"/>
    },
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
