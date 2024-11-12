import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import {
  AppointmentIcon,
  MessageIcon,
  ProfileIcon,
  PropertyIcon,
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
      title: "Properties",
      icon: <PropertyIcon className="w-5 h-5" />,
    },
    {
      path: "/appointments",
      title: "Appointments",
      icon: <AppointmentIcon className="w-5 h-5"/>
    },
    {
      path: "/profile",
      title: "Profile",
      icon: <ProfileIcon className="w-5 h-5" />,
    },
    {
      path: "/conversations",
      title: "Messages",
      icon: <MessageIcon className="w-5 h-5"/>
    },
    {
      path: "/my-transactions",
      title: "Transactions",
      icon: <TransactionIcon className="w-5 h-5"/>
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const myProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPublishPosts());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navbarItems={navbarItems} />
      <div className="flex-1">
        {!myProfile.isVerified && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="max-w-7xl mx-auto px-4 py-3 text-center text-amber-800">
              This account hasn't been verified. Please{" "}
              <button 
                onClick={() => navigate("/verifyAccount")} 
                className="font-medium text-amber-900 hover:text-amber-700 underline underline-offset-2"
              >
                verify it
              </button>
              {" "}to use our services!
            </div>
          </div>
        )}
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <ChatBotWidget />
      <Footer />
    </div>
  );
}
