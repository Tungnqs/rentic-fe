import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PropertyList from "../pages/LandLord/Property/PropertyList";

export const renterRoutes: IRoute[] = [
  {
    path: "/",
    component: <PropertyList />,
  },
  {
    path: "/test",
    component: <Loader />,
  },
  {
    path: "/login",
    component: <Login />
  },
  {
    path: "/register",
    component: <Register />
  },
  {
    path: "/properties",
    component: <PropertyList />,
  },
];
