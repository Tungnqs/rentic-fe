import React from "react";
import { IRoute } from "../interfaces";
import { Navigate } from "react-router";
import PostList from "../pages/Moderator/Post/PostList";
import PostDetail from "../pages/Moderator/Post/PostDetail/PostDetail";
import ReportList from "../pages/Moderator/Report/ReportList";
import DarkEditProfile from "../pages/DarkEditProfile/DarkEditProfile";

export const moderatorRoutes: IRoute[] = [
  {
    path: "/",
    component: <Navigate to={"/posts"} />,
  },
  {
    path: "/posts",
    component: <PostList />
  },
  {
    path: "/posts/:id",
    component: <PostDetail />
  },
  {
    path: "/reports",
    component: <ReportList />
  },
  {
    path: "/profile",
    component: <DarkEditProfile />
  }
];
