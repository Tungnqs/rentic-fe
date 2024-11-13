import React, { useEffect } from "react";
import { Outlet } from "react-router";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import { AccountIcon, ChartIcon, MessageIcon, PackageIcon, TransactionIcon } from "../../assets/icon/icon";
import { INavbarItems } from "../Navbar/Navbar";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchAllTransactions, getAllAccounts } from "../../store/slices/admin.slice";

export default function AdminLayout() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllAccounts());
    dispatch(fetchAllTransactions());
  }, []);

  const navbarItems: INavbarItems[] = [
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
    {
      path: "/transactions",
      title: "User Transactions",
      icon: <TransactionIcon className="w-full"/>
    },
    {
      title: "Statistics",
      path: "/statistics",
      icon: <ChartIcon />,
    },
    {
      path: "/conversations",
      title: "Conversations",
      icon: <MessageIcon className="w-full"/>
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
