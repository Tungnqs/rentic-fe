import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Navigate } from "react-router";
import PropertyList from "../pages/LandLord/Property/PropertyList";
import Homepage from "../pages/Homepage/Homepage";

export const standaloneRoutes: IRoute[] = [
  {
    path: "*",
    component: <Loader />,
  },
  {
    path: "/",
    component: <Homepage />
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
