import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";
import Register from "../pages/Register/Register";
import { Navigate } from "react-router";
import PropertyList from "../pages/LandLord/Property/PropertyList";
import EditProfile from "../pages/EditProfile/EditProfile";
import PropertyDetail from "../pages/LandLord/Property/PropertyDetail/PropertyDetail";
import DepositPage from "../pages/DepositPage/DepositPage";
import PaymentConfirmation from "../pages/PaymentConfirmation/PaymentConfirmation";
import Appointments from "../pages/Appointments/Appointments";
import Conversation from "../pages/Conversation/Conversation";
import Advertisements from "../pages/LandLord/Advertisements/Advertisements";

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
    component: <EditProfile />,
  },
  {
    path: "/deposit",
    component: <DepositPage />,
  },
  {
    path: "/payment/:id",
    component: <PaymentConfirmation />,
  },
  {
    path: "/appointments",
    component: <Appointments isLandLord={true} />,
  },
  {
    path: "/conversations",
    component: <Conversation />,
  },
  {
    path: "/ads",
    component: <Advertisements />,
  },
];
