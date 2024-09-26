import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import { ProfileIcon, PropertyIcon } from "../../assets/icon/icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllPublishPosts } from "../../store/slices/post.slice";

export default function RenterLayout() {
  const navbarItems:INavbarItems[] = [
    {
      path: "/publish-posts",
      title: "Publish Property",
      icon: <PropertyIcon className="w-full"/>
    },
    {
      path: "/profile",
      title: "Your Profile",
      icon: <ProfileIcon className="w-full"/>
    },
    {
      path: "/all-roommate-post",
      title: "Roommate post",
    },
    {
      path: "/my-roommate-post",
      title: "Your roommate post",
    },

  ]

  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(getAllPublishPosts());
  }, [])

  return (
    <div className="block">
      <Navbar navbarItems={navbarItems}/>
      <Outlet />
    </div>
  );
}
