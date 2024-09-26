import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch } from "../../../../store";
import {
  getPostById,
  selectCurrentPost,
  selectLoadingStatus,
  unVerifyPost,
  verifyPost,
} from "../../../../store/slices/post.slice";
import Carousel from "../../../../components/Carousel/Carousel";
import {
  BackIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
  PaymentIcon,
  PetIcon,
  ResizeIcon,
} from "../../../../assets/icon/icon";
import Loader from "../../../../components/Loader/Loader";
import { IPost } from "../../../../interfaces/post.interface";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import mapMaker from "../../../../assets/images/map-marker.png";

const PostDetail = () => {
  const postId = useParams().id;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPostById({ postId: postId as string }));
  }, []);
  const currentPostData = useSelector(selectCurrentPost);
  const loadingStatus = useSelector(selectLoadingStatus);
  const navigate = useNavigate();

  const imageToDisplay = useMemo(() => {
    const imageUrlArr: string[] = currentPostData.images.map(
      (imgObj) => imgObj.path
    );
    return imageUrlArr;
  }, [currentPostData.images]);

  const handleVerifyPost = ()=>{
   dispatch(verifyPost({postId: postId as string}))
  }

  const handleUnVerifyPost = () =>{
    dispatch(unVerifyPost({postId: postId as string}))
  }

  const modifyPostBtn = useMemo(()=>{
    if(currentPostData.isVerified){
      return <div onClick={handleUnVerifyPost} className="px-3 py-2 rounded-md bg-gray-500 select-none cursor-pointer hover:bg-gray-700">Unverify post</div>
    }
    return <div onClick={handleVerifyPost} className="px-3 py-2 rounded-md bg-green-600 select-none cursor-pointer hover:bg-green-800">Verify post</div>
  }, [currentPostData.isVerified])

  return (
    <div className="p-10 max-sm:p-2 flex flex-col gap-4 bg-bgDarkPrimary text-grayLight2 min-h-screen">
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
        <div
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center cursor-pointer group"
        >
          <div className="w-[24px] text-secondaryYellow">
            <BackIcon className="w-full" />
          </div>
          <div className="group-hover:underline">Return</div>
        </div>
        {modifyPostBtn}
      </div>
      <div className="thinBoxShadow rounded-md p-7 bg-bgLeftNavbar">
        {loadingStatus === "loading" ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4  pb-1">
            <div className="flex justify-between text-[26px] text-thirdYellow font-semibold border-b">
              <div>Property: {currentPostData.title}</div>
              <div>{currentPostData.price} $</div>
            </div>
            <div className="border-b">
              <div className="text-[18px]">
                <span className="text-secondaryYellow font-semibold">Id: </span>
                {currentPostData.id}
              </div>
              <div className="flex gap-[2px]">
                <div className="w-[24px] text-secondaryYellow">
                  <LocationIcon className="w-full" />
                </div>
                <div>
                  <span className="text-secondaryYellow font-semibold">
                    Address:{" "}
                  </span>
                  {currentPostData.address}, {currentPostData.commune},{" "}
                  {currentPostData.district}, {currentPostData.city}
                </div>
              </div>
              <div>
                <span className="text-secondaryYellow font-semibold">
                  Purpose:{" "}
                </span>
                For {currentPostData.type}ing
              </div>
              <div>
                <span className="text-secondaryYellow font-semibold">
                  Property Type:{" "}
                </span>
                <span className="uppercase">{currentPostData.property}</span>
              </div>
              <div>
                <span className="text-secondaryYellow font-semibold">
                  Status:{" "}
                </span>
                <span className="uppercase font-semibold">
                  {currentPostData.isVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-red-600">Unverified</span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-2/3 max-lg:w-full">
                <Carousel
                  imageArray={imageToDisplay}
                  expandedClassName="w-full aspect-video"
                />
              </div>
            </div>
            <FacilityBlock currentPostData={currentPostData} />
            <div className="w-full p-[30px] rounded-md bg-bgDarkPrimary shadow-md">
              <div className="text-[20px] font-semibold">Description</div>
              <div className="w-full">{currentPostData.desc}</div>
            </div>
            <MapBlock currentPostData={currentPostData} />
          </div>
        )}
      </div>
    </div>
  );
};

interface IFacilityBlockProps {
  currentPostData: IPost;
}

const FacilityBlock = ({ currentPostData }: IFacilityBlockProps) => {
  return (
    <div className="flex gap-[2px] max-md:flex-wrap text-gray1">
      <div className="bg-bgDarkPrimary p-2 flex-1 min-w-[90px]">
        <div className="border-b-2 border-white flex flex-col items-center pb-3">
          <BedIcon className="w-[24px] " />
          <div>Bedrooms</div>
        </div>
        <div className="text-center">{currentPostData.bedroom}</div>
      </div>
      <div className="bg-bgDarkPrimary p-2 flex-1 min-w-[90px]">
        <div className="border-b-2 border-white flex flex-col items-center pb-3">
          <BathIcon className="w-[24px] " />
          <div>Bathrooms</div>
        </div>
        <div className="text-center">{currentPostData.bathroom}</div>
      </div>
      <div className="bg-bgDarkPrimary p-2 flex-1 min-w-[90px]">
        <div className="border-b-2 border-white flex flex-col items-center pb-3">
          <ResizeIcon className="w-[24px] " />
          <div>Acreage</div>
        </div>
        <div className="text-center">{currentPostData.size} m²</div>
      </div>
      <div className="bg-bgDarkPrimary p-2 flex-1 min-w-[90px]">
        <div className="border-b-2 border-white flex flex-col items-center pb-3">
          <PaymentIcon className="w-[24px]" />
          <div>Price</div>
        </div>
        <div className="text-center">{currentPostData.price} $</div>
      </div>
      <div className="bg-bgDarkPrimary p-2 flex-1 min-w-[90px]">
        <div className="border-b-2 border-white flex flex-col items-center pb-3">
          <PetIcon className="w-[24px]" />
          <div>Allow pet</div>
        </div>
        <div className="text-center font-semibold">
          {currentPostData.pet ? (
            <span className="text-green-600">Allowed</span>
          ) : (
            <span className="text-red-600">Not Allowed</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface IMapBlockProps {
  currentPostData: IPost;
}

const MapBlock = ({ currentPostData }: IMapBlockProps) => {
  const position: [number, number] = [
    currentPostData.latitude,
    currentPostData.longitude,
  ];
  const ICON = icon({
    iconUrl: mapMaker,
    iconSize: [40, 40],
  });
  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-[400px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={ICON}>
          <Popup>{currentPostData.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PostDetail;
