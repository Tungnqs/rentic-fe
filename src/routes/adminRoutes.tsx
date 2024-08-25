import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Navigate } from "react-router";

export const adminRoutes: IRoute[] = [
  {
    path: "/test",
    component: <Loader />,
  },
  {
    path: "/",
    component: <Navigate to={"/register"} />,
  },
  {
    path: "/register",
    component: <Register />
  }
];
