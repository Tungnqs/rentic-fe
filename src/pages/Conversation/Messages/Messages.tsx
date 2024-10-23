import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import unknownAvatar from "../../../assets/images/anonymous-avatar.png";
import { SendIcon } from "../../../assets/icon/icon";
import {
  IChat,
  IMessage,
  ISendMessageReq,
  pushNewMessage,
  readChat,
  selectAllMessagesLoading,
  selectCurrentConversation,
  setLastMsg,
} from "../../../store/slices/chat.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { SocketContext } from "../../../context/SocketContext";
import { toast } from "react-toastify";
import { IUser } from "../../../interfaces/userProfile.interface";
import Loader from "../../../components/Loader/Loader";
import { formatDateTime } from "../Conversation";

interface IMessagesProps {
  selectedConversation: IChat;
  myProfile: IUser;
}

const Messages = ({ selectedConversation, myProfile }: IMessagesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(readChat(selectedConversation?.id));
  }, [selectedConversation]);

  const { socket } = useContext(SocketContext);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };
  const currentConversation = useSelector(selectCurrentConversation);
  const msgArr = useMemo(() => {
    scrollToBottom();
    return currentConversation.messages;
  }, [currentConversation]);

  const loadingSttOfGetMsgs = useSelector(selectAllMessagesLoading);

  const [inputValue, setInputValue] = useState("");

  const handleSendMsg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const request: ISendMessageReq = {
      chatId: selectedConversation.id,
      text: inputValue,
      userId: myProfile.id,
    };
    socket?.emit("sendMessage", request);
    dispatch(setLastMsg(request));
    setInputValue("");
    scrollToBottom();
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage: IMessage) => {
        if (currentConversation.chatId === newMessage.chatId) {
          dispatch(pushNewMessage(newMessage));
          dispatch(setLastMsg(newMessage));
        }
      });
      scrollToBottom();
      return () => {
        if (socket) {
          socket.off("message");
        }
      };
    }
  }, [socket, currentConversation]);

  return (
    <div className="flex-1 p-7 max-sm:p-2 max-sm:pl-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center border-b-2 border-grayLight2 pb-2 h-fit">
        <img
          className="w-[50px] aspect-square object-cover rounded-full"
          src={
            selectedConversation?.receiver?.avatar
              ? selectedConversation?.receiver?.avatar
              : unknownAvatar
          }
          alt=""
        />
        <div className="text-[24px] font-semibold overflow-hidden truncate">
          {selectedConversation?.receiver?.username}
        </div>
      </div>
      <div
        ref={messageContainerRef}
        className="h-[400px] overflow-y-auto flex flex-col gap-2"
      >
        {loadingSttOfGetMsgs === "loading" ? <Loader /> : msgArr &&
          msgArr.map((msg) => (
            <div key={msg.id} className="break-all">
              <div className="flex gap-3">
                <img className="w-10 h-10 aspect-square object-cover rounded-full" src={msg.userId === myProfile.id ? (myProfile.avatar ? myProfile.avatar : unknownAvatar) : (currentConversation.sender.avatar ? currentConversation.sender.avatar : unknownAvatar)} alt="" />
                <div>
                  <div className="flex gap-2 items-center">
                    <div className={`h-fit font-semibold ${msg.userId === myProfile.id ? "text-secondaryYellow" : ""}`}>{msg.userId === myProfile.id ? "Me" : currentConversation.sender.username}</div>
                    <div className="text-[11px] h-fit">{formatDateTime(msg.createdAt as string)}</div>
                  </div>
                  <div className="break-all">{msg.text}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <form onSubmit={handleSendMsg} className="h-fit flex items-center gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full min-h-[48px] h-[48px] max-h-[100px] py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md"
          placeholder="Write something to partner ..."
        />
        <button
          type="submit"
          className="w-fit cursor-pointer bg-lightYellow hover:bg-primaryYellow px-3 py-2 rounded-md text-white border-2 border-gray-400 hover:border-black"
        >
          <SendIcon className="w-6" />
        </button>
      </form>
    </div>
  );
};

export default Messages;
