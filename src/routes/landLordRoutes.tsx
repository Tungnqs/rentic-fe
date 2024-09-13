import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Register from "../pages/Register/Register";
import { Navigate } from "react-router";
import PropertyList from "../pages/LandLord/Property/PropertyList";
import EditProfile from "../pages/EditProfile/EditProfile";
import PropertyDetail from "../pages/LandLord/Property/PropertyDetail/PropertyDetail";

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
    component: <Register />,
  },
  {
    path: "/properties",
    component: <PropertyList />,
  },
  {
    path: "/properties/:id",
    component: <PropertyDetail />,
  },
  {
    path: "/profile",
    component: <EditProfile />
  },
];
