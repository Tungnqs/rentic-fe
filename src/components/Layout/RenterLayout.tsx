import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import {
  AppointmentIcon,
  FindRoommateIcon,
  MessageIcon,
  ProfileIcon,
  PropertyIcon,
  RoommateIcon,
  TransactionIcon,
} from "../../assets/icon/icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllPublishPosts } from "../../store/slices/post.slice";
import Footer from "../Footer/Footer";
import { selectUserProfile } from "../../store/slices/auth.slice";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";

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
      path: "/conversations",
      title: "Conversations",
      icon: <MessageIcon className="w-full"/>
    },
    {
      path: "/my-transactions",
      title: "My Transactions",
      icon: <TransactionIcon className="w-full"/>
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPublishPosts());
  }, []);

  const myProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  return (
    <div className="block">
      <Navbar navbarItems={navbarItems} />
      <div className="z-10 min-h-screen">
        {!myProfile.isVerified && (
          <div className="bg-yellow-100 w-full py-2 text-center">This account hasn't been verified. Please <span onClick={()=>navigate("/verifyAccount")} className="font-bold hover:underline cursor-pointer">verify it</span> to use our services!</div>
        )}
        <Outlet />
      </div>
      <ChatBotWidget />
      <Footer />
    </div>
  );
}
