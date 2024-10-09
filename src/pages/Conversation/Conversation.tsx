import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../store/slices/auth.slice";
import unknownAvatar from "../../assets/images/anonymous-avatar.png";
import Messages from "./Messages/Messages";
import { AppDispatch } from "../../store";
import { get } from "http";
import { getAllConversations, selectAllConversation } from "../../store/slices/chat.slice";

const Conversation = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(getAllConversations());
    }, [])
    const allConversations = useSelector(selectAllConversation);
    const myProfile = useSelector(selectUserProfile);
    const [selectedConversation, setSelectedConversation] = useState(allConversations[0]);

  return (
    <div className="flex justify-center py-10">
      <div className="w-[90%] flex flex-col gap-5">
        <div className="thinBoxShadow rounded-md flex">
            <div className="w-[25%] max-lg:w-[40%] bg-grayLight2 p-7 flex flex-col gap-5">
                <div className="flex gap-2 items-center">
                    <img className="w-[75px] aspect-square object-cover rounded-full" src={myProfile.avatar ? myProfile.avatar : unknownAvatar} alt="" />
                    <div>
                        <div className="text-[20px] font-semibold">{myProfile.firstName} {myProfile.lastName}</div>
                        <div>{myProfile.username}</div>
                    </div>
                </div>
                <div className="text-[24px] font-semibold text-center text-secondaryYellow border-y-2 border-black py-2">
                    People In Conversation
                </div>
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto overflow-x-hidden">
                    {allConversations.map((chat)=>(
                            <div key={chat?.id} onClick={()=>{setSelectedConversation(chat)}} className={`flex w-full gap-2 items-center cursor-pointer p-2 border-2 rounded-lg hover:border-secondaryYellow hover:bg-grayLight1 ${selectedConversation?.id === chat?.id ? "border-secondaryYellow bg-grayLight1" : "bg-transparent"}`}>
                                <img className="w-[50px] aspect-square object-cover rounded-full" src={chat?.receiver?.avatar ? chat?.receiver?.avatar : unknownAvatar} alt="" />
                                <div className="overflow-x-hidden">
                                    <div className="font-semibold overflow-x-hidden truncate">{chat?.receiver?.firstName} {chat?.receiver?.lastName}</div>
                                    <div className="text-[14px] overflow-x-hidden truncate">{chat?.receiver?.username}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {selectedConversation && <Messages selectedConversation={selectedConversation} />}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
