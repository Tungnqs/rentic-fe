import React from "react";
import { IRoute } from "../interfaces";
import { Navigate } from "react-router";
import DarkEditProfile from "../pages/DarkEditProfile/DarkEditProfile";
import AccountList from "../pages/Admin/Account/AccountList";
import PackageList from "../pages/Admin/Package/PackageList";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Conversation from "../pages/Conversation/Conversation";
import Transactions from "../pages/Admin/Transactions/Transactions";
import Statistics from "../pages/Admin/Statistics/Statistics";

export const adminRoutes: IRoute[] = [
  {
    path: "/",
    component: <Navigate to="/accounts" />,
  },
  {
    path: "/profile",
    component: <DarkEditProfile />,
  },
  {
    path: "/accounts",
    component: <AccountList />,
  },
  {
    path: "/packages",
    component: <PackageList />,
  },
  {
    path: "/profile/changePassword",
    component: <ChangePassword isManager={true} />
  },
  {
    path: "/conversations",
    component: <Conversation isManager />
  },
  {
    path: "/transactions",
    component: <Transactions />
  },
  {
    path: "/statistics",
    component: <Statistics />
  }
];
