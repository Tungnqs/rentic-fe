import React, { useState } from "react";
import {
  BathIcon,
  BedIcon,
  HeartFillIcon,
  HeartIcon,
  LocationIcon,
  MessageIcon,
  ReportIcon,
  ResizeIcon,
  SaveIcon,
} from "../../../assets/icon/icon";
import { IPost } from "../../../interfaces/post.interface";
import demoProperty from "../../../assets/images/demo-property.jpg";
import ReportPopup from "../ReportPopup/ReportPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  IReportPostBody,
  reportPostById,
} from "../../../store/slices/report.slice";
import { useNavigate } from "react-router";
import { formatMoney } from "../../../store/slices/app.slice";
import { createConversation } from "../../../store/slices/chat.slice";
import { savePostById, unSavePostById } from "../../../store/slices/post.slice";
import { selectUserProfile } from "../../../store/slices/auth.slice";

interface IPublishPostItemsProps {
  post: IPost;
}

const PublishPostItems = ({ post }: IPublishPostItemsProps) => {
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [reasonInput, setReasonInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const myProfile = useSelector(selectUserProfile);

  const navigate = useNavigate();

  const directToPostDetail = () => {
    navigate("/publish-posts/"+post.id);
  };

  const togglePopup = (e: React.MouseEvent)=>{
    e.stopPropagation();
    setShowReportPopup(!showReportPopup);
  };

  
  const reportPost = async () => {
    const body: IReportPostBody = {
      postId: post.id,
      reason: reasonInput,
    };
    await dispatch(reportPostById(body));
    setReasonInput("");
    setShowReportPopup(!showReportPopup);
  };

  const handleGoToChat = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await dispatch(createConversation(userId));
    navigate("/conversations");
  };

  const handleSavePost = (e: React.MouseEvent)=>{
    e.stopPropagation();
    dispatch(savePostById(post.id));
  }

  const handleUnSavePost = (e: React.MouseEvent)=>{
    e.stopPropagation();
    dispatch(unSavePostById(post.id));
  }

  return (
    <>
      {showReportPopup && (
        <ReportPopup
          reasonInput={reasonInput}
          setReasonInput={setReasonInput}
          handleSubmit={reportPost}
          confirmBtnTitle="Report"
          popupContent={`Tell us the reason why you decide to report this post: "${post.title}"`}
          popupTitle="Report post"
          togglePopup={()=>setShowReportPopup(!showReportPopup)}
          confirmBtnClass="bg-red-600 hover:bg-red-800 text-white"
        />
      )}
      <div onClick={directToPostDetail} className="bg-white rounded-lg shadow-md hover:shadow-xl border w-[49%] max-sm:w-full relative cursor-pointer hover:-translate-y-1 duration-100">
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
            post.type === "rent"
              ? "bg-green-500 text-white"
              : "bg-yellow-500"
          }`}
        >
          {post.type === "rent" ? "For Rent" : "For Sale"}
        </div>
        <div
          onClick={(e)=>togglePopup(e)}
          className="absolute top-4 right-4 p-[6px] bg-white rounded-lg border shadow-md hover:bg-gray-100 transition-colors"
        >
          <ReportIcon className="w-4 text-red-500" />
        </div>
        {post.savedPosts && post.savedPosts.some(item => item.userId === myProfile.id) ? 
        
        <div onClick={(e)=>handleUnSavePost(e)} className="absolute top-4 right-[60px] w-fit bg-white rounded-lg border p-[2px] cursor-pointer shadow-md text-yellow-600">
          <HeartFillIcon className="w-6" />
        </div>
        : 
        <div onClick={(e)=>handleSavePost(e)} className="absolute top-4 right-[60px] w-fit bg-white rounded-lg border p-[2px] cursor-pointer shadow-md text-yellow-600">
          <HeartIcon className="w-6" />
        </div>}
        
        <div>
          <img
            className="h-48 w-full object-cover rounded-t-lg"
            src={post.images.length > 0 ? post.images[0].path : demoProperty}
            alt={post.title}
          />
        </div>
        <div className="p-4 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {post.title}
            </h3>
          <div className="text-xl font-bold text-yellow-600">
              {formatMoney(post.price)} VND
            </div>
          <div className="flex items-center gap-2 text-gray-600 ">
            <LocationIcon className="w-4 h-4 text-yellow-500" />
            <p className="text-sm font-semibold truncate">
              {post.commune}, {post.district}, {post.city}
            </p>
          </div>
          <div className="text-sm font-semibold text-gray-700  uppercase">
            {post.property}
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex gap-3">
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <BedIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{post.bedroom}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <BathIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{post.bathroom}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <ResizeIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{post.size}m²</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <HeartFillIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{post.savedPosts?.length}</span>
              </div>
            </div>
            <button
              onClick={(e) => handleGoToChat(post.user.id, e)}
              className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-colors"
            >
              <MessageIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishPostItems;