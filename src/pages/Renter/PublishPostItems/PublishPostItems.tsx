import React, { useState } from 'react';
import { BathIcon, BedIcon, LocationIcon, MessageIcon, ReportIcon, ResizeIcon } from '../../../assets/icon/icon';
import { IPost } from '../../../interfaces/post.interface';
import demoProperty from "../../../assets/images/demo-property.jpg"
import ReportPopup from '../ReportPopup/ReportPopup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { IReportPostBody, reportPostById } from '../../../store/slices/report.slice';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../../store/slices/app.slice';
import { createConversation } from '../../../store/slices/chat.slice';

interface IPublishPostItemsProps{
    post: IPost;
}

const PublishPostItems = ({post}: IPublishPostItemsProps) => {
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [reasonInput, setReasonInput] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const directToPostDetail = ()=>{
        navigate(post.id);
    }

    const togglePopup = () =>{
      setShowReportPopup(!showReportPopup);
    }

    const reportPost = async() =>{
        const body: IReportPostBody={
            postId: post.id,
            reason: reasonInput
        }
        await dispatch(reportPostById(body));
        setReasonInput("");
        togglePopup();
    }

    const handleGoToChat = async (userId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        await dispatch(createConversation(userId));
        navigate("/conversations");
    };

    return (
        <>
            {showReportPopup && <ReportPopup reasonInput={reasonInput} setReasonInput={setReasonInput} handleSubmit={reportPost} confirmBtnTitle='Report' popupContent={`Tell us the reason why you decide to report this post: "${post.title}"`} popupTitle='Report post' togglePopup={togglePopup} confirmBtnClass='bg-red-600 hover:bg-red-800 text-white' />}
            <div className={`absolute top-[3px] left-[3px] border-2 border-darkGray bg-grayLight1 text-[13px] w-[50px] p-2 aspect-square rounded-full uppercase flex justify-center items-center font-semibold ${post.type === "rent" ? "text-green-700": "text-secondaryYellow"}`}>{post.type}</div>
            <img onClick={directToPostDetail}  className='aspectPostImg w-[45%] rounded-lg object-cover' src={post.images.length > 0 ? post.images[0].path : demoProperty} alt="" />
            <div onClick={togglePopup} className='absolute bg-white top-3 right-3 p-2 border-2 rounded-md hover:bg-grayLight2 hover:border-red-600 cursor-pointer'><ReportIcon className='w-4' /></div>
            <div onClick={directToPostDetail} className='flex flex-col gap-3 w-[55%] justify-between'>
                <div className='text-[20px] font-semibold'>
                    {post.title}
                </div>
                <div className='flex flex-col gap-3 justify-between'>
                    <div className='flex gap-[2px] items-center w-full'>
                        <LocationIcon className='w-4 text-secondaryYellow' /><div className='flex-1 truncate'>{post.commune}, {post.district}, {post.city}</div>
                    </div>
                        <div className='bg-lightYellow px-[6px] h-fit py-[2px] rounded-sm w-fit text-[13px]'>
                            {formatMoney(post.price)} VND
                        </div>
                    <div className='uppercase font-semibold flex'>{post.property}</div>
                    <div className='flex justify-between flex-wrap gap-y-2'>
                        <div className='flex gap-2'>
                            <div className='flex gap-1 p-1 bg-grayLight2 rounded-md items-center'><BedIcon className='w-4'/><div>{post.bedroom}</div></div>
                            <div className='flex gap-1 p-1 bg-grayLight2 rounded-md items-center'><BathIcon className='w-4'/><div>{post.bathroom}</div></div>
                            <div className='flex gap-1 p-1 bg-grayLight2 rounded-md items-center'><ResizeIcon className='w-4'/><div>{post.size}</div></div>
                        </div>
                        <div onClick={(e)=>handleGoToChat(post.user.id, e)} className='p-2 border-2 rounded-md hover:bg-grayLight2 hover:border-black cursor-pointer'><MessageIcon className='w-4' /></div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default PublishPostItems;