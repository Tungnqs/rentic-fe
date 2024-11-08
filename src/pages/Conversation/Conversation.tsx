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

    const loadingSttOfGetChats = useSelector(selectAllChatsLoading);

    useEffect(() => {
        if (selectedConversation && socket) {
            socket.emit('joinChat', selectedConversation.id);
        }
    }, [selectedConversation, socket, allConversations]);

  return (
    <div className={`flex justify-center pb-10 pt-2 min-h-screen ${isManager ? "bg-bgDarkPrimary text-grayLight2" : ""}`}>
      <div className="w-[90%] max-[500px]:w-[97%] flex flex-col gap-5">
        <div className="shadow-md rounded-md flex border">
            <div className={`w-[25%] max-lg:w-[40%] max-[500px]:w-[30%] ${isManager ? "bg-bgLeftNavbar" : ""} p-7 max-sm:p-2 flex flex-col gap-5 rounded-l-md`}>
                <div className="flex justify-center gap-2 items-center border-b pb-3">
                    <img className="w-[75px] aspect-square object-cover rounded-full" src={myProfile.avatar ? myProfile.avatar : unknownAvatar} alt="" />
                    <div className="max-[500px]:hidden">
                        <div className="text-[20px] font-semibold break-all">{myProfile.firstName} {myProfile.lastName}</div>
                        <div>{myProfile.username}</div>
                    </div>
                </div>
                <div className={`flex flex-col gap-3 max-h-[330px] overflow-y-auto overflow-x-hidden ${isManager ? "darkScrollBar" : ""}`}>
                    {loadingSttOfGetChats === "loading" ? <Loader /> : allConversations.map((chat)=>(
                            <div key={chat?.id} onClick={()=>{setSelectedConversation(chat)}} className={`flex w-full gap-2 items-center cursor-pointer p-2 rounded-lg border ${isManager ? "hover:bg-bgDarkPopupBody" : ""} ${selectedConversation?.id === chat?.id ? `border ${isManager ? "bg-bgDarkPopupBody" : "bg-yellow-50"}` : `bg-transparent ${isManager ? "border-bgDarkSecondary" : "hover:bg-gray-50"}`}`}>
                                <img className="w-[50px] aspect-square object-cover rounded-full max-[500px]:hidden" src={chat?.receiver?.avatar ? chat?.receiver?.avatar : unknownAvatar} alt="" />
                                <div className="overflow-x-hidden">
                                    <div className="font-semibold overflow-x-hidden truncate">{chat?.receiver?.username}</div>
                                    <div className="text-[14px] overflow-x-hidden truncate text-gray-400 font-medium"><b>{chat?.lastMessage?.userId === myProfile.id ? "You:" : ""} </b>{chat?.lastMessage?.text}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {selectedConversation ? 
                <Messages isManager={isManager} myProfile={myProfile} selectedConversation={selectedConversation} /> 
            : (<div className={`flex-1 flex p-7 max-sm:p-2 max-sm:pl-4 flex-col justify-center items-center h-[590px] ${isManager ? "bg-bgLeftNavbarLighter": ""}`}>
                <EmptyInboxIcon className="w-24" />
                <div className="font-semibold">Inbox is empty, connect to a partner to have conversation!</div>
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
