import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar, { INavbarItems } from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getAllMyAds, getAllMyPosts } from "../../store/slices/post.slice";
import { 
  AdsIcon, 
  AppointmentIcon, 
  MessageIcon, 
  ProfileIcon, 
  PropertyIcon, 
  TransactionIcon 
} from "../../assets/icon/icon";
import Footer from "../Footer/Footer";
import { selectUserProfile } from "../../store/slices/auth.slice";
import ChatBotWidget from "../ChatBotWidget/ChatBotWidget";

export default function LandlordLayout() {
  const navbarItems: INavbarItems[] = [
    {
      path: "/properties",
      title: "Properties",
      icon: <PropertyIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-600"/>
    },
    {
      path: "/profile",
      title: "Profile",
      icon: <ProfileIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-600"/>
    },
    {
      path: "/appointments",
      title: "Appointments",
      icon: <AppointmentIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-600"/>
    },
    {
      title: "Ads",
      path: "/ads",
      icon: <AdsIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-600" />,
    },
    {
      path: "/conversations",
      title: "Messages",
      icon: <MessageIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-600"/>
    },
    {
      path: "/my-transactions",
      title: "Transactions",
      icon: <TransactionIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-600"/>
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const myProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMyPosts());
    dispatch(getAllMyAds());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Navbar navbarItems={navbarItems}/>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Verification Banner */}
        {!myProfile.isVerified && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-x-3">
                <p className="text-sm text-amber-800">
                  This account hasn't been verified. Please{" "}
                  <button 
                    onClick={() => navigate("/verifyAccount")} 
                    className="font-medium text-amber-900 hover:text-amber-700 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 rounded"
                  >
                    verify it
                  </button>
                  {" "}to use our services!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBotWidget />
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
