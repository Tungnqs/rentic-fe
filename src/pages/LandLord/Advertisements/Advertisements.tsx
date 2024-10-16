import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { useNavigate } from "react-router";
import { BackIcon } from "../../../assets/icon/icon";
import CreateAdsPopup from "./CreateAdsPopup/CreateAdsPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { getAllPackages } from "../../../store/slices/admin.slice";
import { getAllMyAds, selectAdsLoadingStatus, selectAllMyAds } from "../../../store/slices/post.slice";
import { formatMoney } from "../../../store/slices/app.slice";
import { formatDate } from "../../Moderator/Report/ReportList";

const Advertisements = () => {
  const navigate = useNavigate();
  const [isShowAddPopup, setShowAddPopup] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(getAllPackages());
        dispatch(getAllMyAds());
    }, [])

    const allMyAds = useSelector(selectAllMyAds);
    console.log('allMyAds: ', allMyAds);
    const adsLoading = useSelector(selectAdsLoadingStatus);
  return (
    <div className="flex justify-center py-10">
        {isShowAddPopup && <CreateAdsPopup togglePopup={()=>setShowAddPopup(!isShowAddPopup)} />}
      <div className="w-[90%] flex flex-col gap-5">
        <div className="flex justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex gap-2 items-center cursor-pointer group"
          >
            <div className="w-[24px] text-secondaryYellow">
              <BackIcon className="w-full" />
            </div>
            <div className="group-hover:underline">Go back</div>
          </div>
          <div onClick={()=>setShowAddPopup(true)} className="bg-primaryYellow hover:bg-lightYellow px-3 py-2 cursor-pointer rounded-md">Create Post Advertisement</div>
        </div>
        <div className="text-red-600 font-semibold hidden max-[550px]:block">
          *Recommend to use application in landscape view
        </div>
        <div>
          <div className="thinBoxShadow rounded-md p-7">
            {adsLoading === "loading" ? (
              <Loader />
            ) : (
            <div
              style={{ transform: "rotateX(180deg)" }}
              className="relative overflow-x-auto sm:rounded-lg"
            >
              <table
                style={{ transform: "rotateX(180deg)" }}
                className="w-full text-sm text-left rtl:text-right text-gray-500 "
              >
                <thead className="text-xs text-gray-700 uppercase bg-grayLight2 ">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      Package
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Cost
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Post title
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Start Date
                    </th>
                    <th scope="col" className="px-2 py-3">
                      End Date
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-2 py-3 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {allMyAds.map((ad, index) => (
                  <tr
                    key={index}
                    className={`${
                        index % 2 === 0 ? "bg-white " : "bg-grayLight1 "
                    } border-b `}
                  >
                    <th
                      scope="row"
                      className="px-2 py-4 max-w-[150px] overflow-hidden truncate text-black font-semibold whitespace-nowrap "
                    >
                      {ad.adPackage.name}
                    </th>
                    <td className="px-2 py-4 text-green-600 font-bold">{formatMoney(ad.totalCost)}₫</td>
                    <td className="px-2 py-4 text-black font-semibold">
                      {ad.post.title}
                    </td>
                    <td className="px-2 py-4 text-green-600 font-bold">
                      {formatMoney(ad.post.price)}₫
                    </td>
                    <td className="px-2 py-4">{formatDate(ad.startDate)}</td>
                    <td className="px-2 py-4">{formatDate(ad.endDate)}</td>
                    <td className="px-2 py-4 font-semibold">
                      {ad.isActive ? <span className="text-green-600">Active</span> : <span className="text-secondaryYellow">Inactive</span>}
                    </td>

                    <td className="px-2 py-4 flex flex-col gap-2 items-center h-full">
                      <div
                        className="w-fit font-medium bg-red-600 hover:bg-red-800 rounded-sm text-white px-2 py-1 cursor-pointer"
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                  ))} 
                </tbody>
              </table>
            </div>
           )} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
