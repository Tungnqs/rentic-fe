import React from "react";
import { IRoute } from "../interfaces";
import Loader from "../components/Loader/Loader";

export const standaloneRoutes: IRoute[] = [
  {
    path: "*",
    component: <Loader />,
  },
];
