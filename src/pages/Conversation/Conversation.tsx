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
import { BreakPoint } from "../../interfaces";

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

interface IConversationProps{
    isManager?: boolean;
}

const Conversation = ({isManager}:IConversationProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {socket} = useContext(SocketContext);
    useEffect(()=>{
        dispatch(getAllConversations());
    }, [])
    const allConversations = useSelector(selectAllConversation);
    const myProfile = useSelector(selectUserProfile);
    const [selectedConversation, setSelectedConversation] = useState<IChat | null>(null);

    const handleReturnToChatList = ()=>{
        setSelectedConversation(null);
    }

    const loadingSttOfGetChats = useSelector(selectAllChatsLoading);

    useEffect(() => {
        if (selectedConversation && socket) {
            socket.emit('joinChat', selectedConversation.id);
        }
    }, [selectedConversation, socket, allConversations]);

  return (
    <div className={`min-h-screen ${isManager ? "bg-bgDarkPrimary text-grayLight2" : "bg-grayLight1"}`}>
        <div className={`flex justify-center pb-10 pt-2`}>
      <div className={`w-[90%] max-[500px]:w-[97%] max-w-[${BreakPoint.xl}] flex flex-col gap-5 ${isManager ? "" : "bg-white"}`}>
        <div className={`shadow-md rounded-md flex border ${isManager ? "border-gray-600" : ""}`}>
            <div className={`h-[calc(100vh_-_90px)] w-[35%] max-lg:w-full p-7 max-sm:p-5 flex-col gap-5 rounded-l-md border-r ${isManager ? "bg-bgLeftNavbar" : ""} ${selectedConversation ? "hidden lg:flex" : "flex"}`}>
                <div className={`flex gap-2 items-center border-b pb-3 ${isManager ? "border-gray-600" : ""}`}>
                    <img className="w-[60px] aspect-square object-cover rounded-full" src={myProfile.avatar ? myProfile.avatar : unknownAvatar} alt="" />
                    <div>
                        <div className="text-[20px] font-semibold break-all">{myProfile.firstName} {myProfile.lastName}</div>
                        <div>{myProfile.username}</div>
                    </div>
                </div>
                <div className={`text-[24px] font-semibold text-center text-secondaryYellow py-2`}>
                    People In Conversation
                </div>
                <div className={`flex flex-col gap-3 overflow-y-auto overflow-x-hidden flex-1 ${isManager ? "darkChatScrollBar" : ""}`}>
                    {loadingSttOfGetChats === "loading" ? <Loader /> : allConversations.map((chat)=>(
                            <div key={chat?.id} onClick={()=>{setSelectedConversation(chat)}} className={`flex w-full gap-2 items-center cursor-pointer p-2 rounded-lg border ${isManager ? "hover:bg-bgDarkPopupBody" : ""} ${selectedConversation?.id === chat?.id ? `border ${isManager ? "bg-bgDarkPopupBody" : "bg-yellow-50"}` : `bg-transparent ${isManager ? "border-bgDarkSecondary" : "hover:bg-gray-100"}`}`}>
                                <img className="w-[50px] aspect-square object-cover rounded-full" src={chat?.receiver?.avatar ? chat?.receiver?.avatar : unknownAvatar} alt="" />
                                <div className="overflow-x-hidden">
                                    <div className="font-semibold overflow-x-hidden truncate">{chat?.receiver?.username}</div>
                                    <div className="text-[14px] overflow-x-hidden truncate text-gray-500 font-medium"><b>{chat?.lastMessage?.userId === myProfile.id ? "You:" : ""} </b>{chat?.lastMessage?.text}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {selectedConversation ? 
                <Messages handleReturnToChatList={handleReturnToChatList} isManager={isManager} myProfile={myProfile} selectedConversation={selectedConversation} /> 
            : (<div className={`h-full max-lg:hidden flex-1 flex p-7 max-sm:p-2 max-sm:pl-4 flex-col justify-center items-center h-[590px] ${isManager ? "bg-bgLeftNavbarLighter": ""}`}>
                <EmptyInboxIcon className="w-24" />
                <div className="font-semibold">Inbox is empty, connect to a partner to have conversation!</div>
            </div>)}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Conversation;
