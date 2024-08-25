import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Register from "../pages/Register/Register";
import { Navigate } from "react-router";

export const landLordRoutes: IRoute[] = [
  {
    path: "/",
    component: <Navigate to={"/properties"} />,
  },
  {
    path: "/test",
    component: <Loader />,
  },
  {
    path: "/register",
    component: <Register />
  },
  {
    path: "/properties",
    component: <div>properties</div>
  }
];
