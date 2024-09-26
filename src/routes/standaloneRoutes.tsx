import React from "react";
import { IRoute } from "../interfaces";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Login from "../pages/SignIn/Login";
import { Navigate } from "react-router";
import Homepage from "../pages/Homepage/Homepage";

export const standaloneRoutes: IRoute[] = [
  {
    path: "*",
    component: <PageNotFound />,
  },
  {
    path: "/",
    component: <Homepage />,
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
