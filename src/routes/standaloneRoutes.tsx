import React from "react";
import { IRoute } from "../interfaces";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Login from "../pages/SignIn/Login";
import Homepage from "../pages/Homepage/Homepage";
import ForgetPassword from "../pages/ResetPassword/ForgetPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import PostDetail from "../pages/Renter/PostDetail/PostDetail";

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
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/forget-password",
    component: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    component: <ResetPassword />,
  },
  {
    path: "/post-detail/:id",
    component: <PostDetail />
  }
];
