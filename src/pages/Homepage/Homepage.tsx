import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BannerImg from "../../assets/images/city-urban-sunset.jpg";
import { formatMoney } from "../../store/slices/app.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  getHomepageAds,
  getTenLatestPosts,
  selectLatestPosts,
} from "../../store/slices/post.slice";
import LatestPostsBlock from "./LatestPostsBlock";
import PublishedAdsBlock from "./PublishedAdsBlock";
import BottomBanner from "./BottomBanner";
import Footer from "../../components/Footer/Footer";
import { selectIsLogin } from "../../store/slices/auth.slice";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTenLatestPosts());
    dispatch(getHomepageAds());
  }, []);

  const isLoggedIn = useSelector(selectIsLogin);

  return (
    <div>
      {!isLoggedIn && <Navbar />}
      <div className="flex flex-col gap-10">
        <div className="block1 relative">
          <img
            src={BannerImg}
            className="w-full h-[500px] object-cover gray grayscale-[30%]"
            alt=""
          />
          <div className="text-white absolute top-[20%] max-xl:top-[30%] max-[556px]:top-[20%] right-[12.5%] w-[75%] flex flex-col gap-3 select-none">
            <div className="text-[56px] max-xl:text-[42px] font-bold text-center drop-shadow-lg">
              The #1 site real estate professionals trust*
            </div>
            <div className="flex justify-evenly text-grayLight2 text-[24px] max-xl:text-[20px] font-semibold box-content p-3 bg-[#0000009a]">
              <div className="border-b-[3px] border-transparent hover:border-white">
                Buy
              </div>
              <div className="border-b-[3px] border-transparent hover:border-white">
                Rent
              </div>
              <div className="border-b-[3px] border-transparent hover:border-white">
                Sell
              </div>
              <div className="border-b-[3px] border-transparent hover:border-white max-md:hidden">
                Pre-approval
              </div>
              <div className="border-b-[3px] border-transparent hover:border-white max-md:hidden">
                Just sold
              </div>
              <div className="border-b-[3px] border-transparent hover:border-white">
                Home value
              </div>
            </div>
          </div>
        </div>
        <PublishedAdsBlock />
        <LatestPostsBlock />
        <div className="flex justify-center">
          <BottomBanner />
        </div>
      </div>
      {!isLoggedIn && <Footer />}
    </div>
  );
};

export default Homepage;
