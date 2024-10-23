import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../store/slices/auth.slice";
import unknownAvatar from "../../assets/images/anonymous-avatar.png";
import Messages from "./Messages/Messages";
import { AppDispatch } from "../../store";
import { getAllConversations, IChat, IMessage, selectAllChatsLoading, selectAllConversation } from "../../store/slices/chat.slice";
import { SocketContext } from "../../context/SocketContext";
import Loader from "../../components/Loader/Loader";
import { EmptyInboxIcon } from "../../assets/icon/icon";

export const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;
};

const Conversation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {socket} = useContext(SocketContext);
    useEffect(()=>{
        dispatch(getAllConversations());
    }, [])
    const allConversations = useSelector(selectAllConversation);
    const myProfile = useSelector(selectUserProfile);
    const [selectedConversation, setSelectedConversation] = useState<IChat | null>(null);

    const loadingSttOfGetChats = useSelector(selectAllChatsLoading);

    useEffect(() => {
        if (selectedConversation && socket) {
            socket.emit('joinChat', selectedConversation.id);
        }
    }, [selectedConversation, socket, allConversations]);

  return (
    <div className="flex justify-center pb-10 pt-2">
      <div className="w-[90%] flex flex-col gap-5">
        <div className="thinBoxShadow rounded-md flex">
            <div className="w-[25%] max-lg:w-[40%] bg-grayLight2 p-7 max-sm:p-2 flex flex-col gap-5">
                <div className="flex justify-center gap-2 items-center">
                    <img className="w-[75px] aspect-square object-cover rounded-full" src={myProfile.avatar ? myProfile.avatar : unknownAvatar} alt="" />
                    <div className="max-[500px]:hidden">
                        <div className="text-[20px] font-semibold break-all">{myProfile.firstName} {myProfile.lastName}</div>
                        <div>{myProfile.username}</div>
                    </div>
                </div>
                <div className="text-[24px] font-semibold text-center text-secondaryYellow border-y-2 border-black py-2">
                    People <span className="max-[500px]:hidden">In Conversation</span>
                </div>
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto overflow-x-hidden">
                    {loadingSttOfGetChats === "loading" ? <Loader /> : allConversations.map((chat)=>(
                            <div key={chat?.id} onClick={()=>{setSelectedConversation(chat)}} className={`flex w-full gap-2 items-center cursor-pointer p-2 border-2 rounded-lg hover:border-secondaryYellow hover:bg-grayLight1 ${selectedConversation?.id === chat?.id ? "border-secondaryYellow bg-grayLight1" : "bg-transparent"}`}>
                                <img className="w-[50px] aspect-square object-cover rounded-full" src={chat?.receiver?.avatar ? chat?.receiver?.avatar : unknownAvatar} alt="" />
                                <div className="overflow-x-hidden">
                                    <div className="font-semibold overflow-x-hidden truncate">{chat?.receiver?.username}</div>
                                    <div className="text-[14px] overflow-x-hidden truncate"><b>{chat?.lastMessage?.userId === myProfile.id ? "Me" : chat?.receiver?.username}: </b>{chat?.lastMessage?.text}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {selectedConversation ? 
            <Messages myProfile={myProfile} selectedConversation={selectedConversation} /> 
            : (<div className="flex-1 flex p-7 max-sm:p-2 max-sm:pl-4 flex-col justify-center items-center h-[590px]">
                <EmptyInboxIcon className="text-black w-24" />
                <div className="font-semibold">Inbox is empty, connect to a partner to have conversation!</div>
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
