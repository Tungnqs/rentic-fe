import React from "react";
import { Outlet } from "react-router";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import { AccountIcon, ChartIcon } from "../../assets/icon/icon";
import { INavbarItems } from "../Navbar/Navbar";

export default function AdminLayout() {
  const navbarItems: INavbarItems[] = [
    {
      title: "Statistics",
      path: "/statistic",
      icon: <ChartIcon />,
    },
    {
      title: "Account Management",
      path: "/accounts",
      icon: <AccountIcon />,
    },
  ];

  return (
    <div className="flex">
      <LeftNavBar navbarItems={navbarItems}/>
      <div className="w-full pl-[30px]">
        <Outlet />
      </div>
    </div>
  );
}
