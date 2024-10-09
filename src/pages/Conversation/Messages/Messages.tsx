import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import unknownAvatar from "../../../assets/images/anonymous-avatar.png";
import { SendIcon } from "../../../assets/icon/icon";
import { IChat, ISendMessageReq, readChat, selectCurrentConversation, sendMessage } from "../../../store/slices/chat.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { selectUserProfile } from "../../../store/slices/auth.slice";
import { SocketContext } from "../../../context/SocketContext";

interface IMessagesProps {
  selectedConversation: IChat;
}

const Messages = ({ selectedConversation }: IMessagesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(readChat(selectedConversation?.id));
  }, [selectedConversation]);

  const {socket} = useContext(SocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };
  const currentConversation = useSelector(selectCurrentConversation);
  const msgArr = useMemo(()=>{
    scrollToBottom();
    return currentConversation.messages;
  }, [currentConversation])

  const myProfile = useSelector(selectUserProfile);
  const [inputValue, setInputValue] = useState("");

  const handleSendMsg = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (!inputValue.trim()) return;
    const request: ISendMessageReq={
      chatId: selectedConversation.id,
      text: inputValue,
    }
    socket?.emit("sendMessage", request)
    await dispatch(sendMessage(request));
    setInputValue("");
    scrollToBottom();
  }

  useEffect(()=>{
    if(socket){
      socket.on("message", (data)=>{
        console.log('data: ', data);
      })
    }
  }, [socket, currentConversation])
  return (
    <div className="flex-1 p-7 flex flex-col gap-4">
      <div className="flex gap-2 items-center border-b-2 border-grayLight2 pb-2 h-fit">
        <img
          className="w-[50px] aspect-square object-cover rounded-full"
          src={selectedConversation?.receiver?.avatar ? selectedConversation?.receiver?.avatar : unknownAvatar}
          alt=""
        />
        <div className="text-[24px] font-semibold">
          {selectedConversation?.receiver?.firstName} {selectedConversation?.receiver?.lastName}
        </div>
      </div>
      <div ref={messageContainerRef} className="h-[450px] overflow-y-auto flex flex-col gap-2">
        {msgArr && msgArr.map((msg)=>(
          <div key={msg.id} className="break-all"> {msg.userId === myProfile.id ? (<b>Me:</b>) : (<b>{currentConversation?.sender?.username}</b>)} {msg.text}</div>
        ))}
      </div>
      <form onSubmit={handleSendMsg} className="h-fit flex items-center gap-2">
        <input
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
          className="w-full min-h-[48px] h-[48px] max-h-[100px] py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md"
          placeholder="Write something to your partner ..."
        />
        <button type="submit" className="w-fit cursor-pointer bg-lightYellow hover:bg-primaryYellow px-3 py-2 rounded-md text-white"><SendIcon className="w-6" /></button>
      </form>
    </div>
  );
};

export default Messages;
