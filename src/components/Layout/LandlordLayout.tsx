import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllMyAds, getAllMyPosts } from "../../store/slices/post.slice";
import { AdsIcon, AppointmentIcon, MessageIcon, ProfileIcon, PropertyIcon, TransactionIcon } from "../../assets/icon/icon";
import Footer from "../Footer/Footer";
import { selectUserProfile } from "../../store/slices/auth.slice";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";

export default function LandlordLayout() {
  const navbarItems:INavbarItems[] = [
    {
      path: "/properties",
      title: "Your Property",
      icon: <PropertyIcon className="w-full"/>
    },
    {
      path: "/profile",
      title: "Your Profile",
      icon: <ProfileIcon className="w-full"/>
    },
    {
      path: "/appointments",
      title: "Appointments",
      icon: <AppointmentIcon className="w-full"/>
    },
    {
      title: "Advertisement",
      path: "/ads",
      icon: <AdsIcon />,
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
  ]
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllMyPosts());
    dispatch(getAllMyAds());
  }, []);

  const myProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  return (
    <div className="block">
      <Navbar isLandLord navbarItems={navbarItems}/>
      <div className="min-h-screen">
        {!myProfile.isVerified && (
          <div className=" bg-yellow-100 w-full py-3 text-center">This account hasn't been verified. Please <span onClick={()=>navigate("/verifyAccount")} className="font-bold hover:underline cursor-pointer">verify it</span> to use our services!</div>
        )}
        <Outlet />
      </div>
      <ChatBotWidget />
      <Footer/>
    </div>
  );
}
