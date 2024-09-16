import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Register from "../pages/Register/Register";
import PropertyList from "../pages/LandLord/Property/PropertyList";
import Login from "../pages/Login/Login";

export const renterRoutes: IRoute[] = [
  {
    path: "/",
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
];
