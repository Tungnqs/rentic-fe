import React from "react";
import { Outlet } from "react-router";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import {
  AccountIcon,
  ChartIcon,
  MessageIcon,
  PackageIcon,
  TransactionIcon,
} from "../../assets/icon/icon";
import { INavbarItems } from "../Navbar/Navbar";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";

export default function AdminLayout() {
  const navbarItems: INavbarItems[] = [
    {
      title: "Accounts",
      path: "/accounts",
      icon: <AccountIcon className="w-5 h-5" />,
    },
    {
      title: "Packages",
      path: "/packages",
      icon: <PackageIcon className="w-5 h-5" />,
    },
    {
      path: "/transactions",
      title: "Transactions",
      icon: <TransactionIcon className="w-5 h-5" />,
    },
    {
      path: "/conversations",
      title: "Messages",
      icon: <MessageIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex">
      <LeftNavBar navbarItems={navbarItems} />
      <div className="flex-1 bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <ChatBotWidget />
    </div>
  );
}
