import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Login from "../pages/login/Login";

export const layoutRoutes: IRoute[] = [
  {
    path: "/test",
    component: <Loader />,
  },
  {
    path: "/login",
    component: <Login />
  }
];
