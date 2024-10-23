import React from "react";
import { Outlet } from "react-router";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import { AccountIcon, ChartIcon, PackageIcon } from "../../assets/icon/icon";
import { INavbarItems } from "../Navbar/Navbar";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";

export default function AdminLayout() {
  const navbarItems: INavbarItems[] = [
    // {
    //   title: "Statistics",
    //   path: "/statistic",
    //   icon: <ChartIcon />,
    // },
    {
      title: "Account Management",
      path: "/accounts",
      icon: <AccountIcon />,
    },
    {
      title: "Package Management",
      path: "/packages",
      icon: <PackageIcon />,
    },
  ];

  return (
    <div className="flex">
      <LeftNavBar navbarItems={navbarItems}/>
      <div className="w-full pl-[30px] z-10">
        <Outlet />
      </div>
      <ChatBotWidget />
    </div>
  );
}
