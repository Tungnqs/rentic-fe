import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import { AdsIcon, PropertyIcon, ReportIcon } from "../../assets/icon/icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllUserPosts } from "../../store/slices/post.slice";

export default function ModeratorLayout() {
  const navbarItems: INavbarItems[] = [
    {
      title: "Post Management",
      path: "/posts",
      icon: <PropertyIcon />,
    },
    {
      title: "Report Management",
      path: "/reports",
      icon: <ReportIcon />,
    },
    {
      title: "Advertisement",
      path: "/ads",
      icon: <AdsIcon />,
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllUserPosts());
  }, []);

  return (
    <div className="flex">
      <LeftNavBar navbarItems={navbarItems} />
      <div className="w-full pl-[80px]">
        <Outlet />
      </div>
    </div>
  );
}
