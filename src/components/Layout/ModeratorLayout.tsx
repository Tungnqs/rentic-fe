import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import { AdsIcon, MessageIcon, PropertyIcon, ReportIcon } from "../../assets/icon/icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllUserAds, getAllUserPosts } from "../../store/slices/post.slice";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";

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
    {
      path: "/conversations",
      title: "Conversations",
      icon: <MessageIcon className="w-full"/>
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllUserPosts());
    dispatch(getAllUserAds());
  }, []);

  return (
    <div className="flex">
      <LeftNavBar navbarItems={navbarItems} />
      <div className="w-full pl-[30px] z-10">
        <Outlet />
      </div>
      <ChatBotWidget />
    </div>
  );
}
