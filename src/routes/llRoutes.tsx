import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import PropertyList from "../pages/LandLord/Property/PropertyList";
import { Navigate } from "react-router";
import Login from "../pages/Login/Login";

export const llRoutes: IRoute[] = [
  {
    path: "/properties",
    component: <PropertyList />,
  },
  {
    path: "/",
    component: <Navigate to={"/properties"} />,
  },
  {
    path: "/test",
    component: <Loader />,
  },
];
