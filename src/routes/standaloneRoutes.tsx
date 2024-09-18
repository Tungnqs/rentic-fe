import React from "react";
import { IRoute } from "../interfaces";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Login from "../pages/SignIn/Login";
import { Navigate } from "react-router";

export const standaloneRoutes: IRoute[] = [
  {
    path: "*",
    component: <PageNotFound />,
  },
  {
    path: "/",
    component: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    component: <Login />
  },
  {
    path: "/register",
    component: <Register />
  },
];
