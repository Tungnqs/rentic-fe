import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import {
  AppointmentIcon,
  FindRoommateIcon,
  MessageIcon,
  ProfileIcon,
  PropertyIcon,
  RoommateIcon,
} from "../../assets/icon/icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllPublishPosts } from "../../store/slices/post.slice";

export default function RenterLayout() {
  const navbarItems: INavbarItems[] = [
    {
      path: "/publish-posts",
      title: "Published Property",
      icon: <PropertyIcon className="w-full" />,
    },
    {
      path: "/appointments",
      title: "Appointments",
      icon: <AppointmentIcon className="w-full"/>
    },
    {
      path: "/profile",
      title: "Your Profile",
      icon: <ProfileIcon className="w-full" />,
    },
    {
      path: "/all-roommate-post",
      title: "Roommate post",
      icon: <FindRoommateIcon className="w-full" />,
    },
    {
      path: "/my-roommate-post",
      title: "Your roommate post",
      icon: <RoommateIcon className="w-full" />,
    },
    {
      path: "/conversations",
      title: "Conversations",
      icon: <MessageIcon className="w-full"/>
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPublishPosts());
  }, []);

  return (
    <div className="block">
      <Navbar navbarItems={navbarItems} />
      <div className="z-10">
        <Outlet />
      </div>
    </div>
  );
}
