import React from "react";
import { IRoute } from "../interfaces";
import { Navigate } from "react-router";
import DarkEditProfile from "../pages/DarkEditProfile/DarkEditProfile";
import AccountList from "../pages/Admin/Account/AccountList";

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
  }
];
