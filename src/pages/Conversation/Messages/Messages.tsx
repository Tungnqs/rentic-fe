import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import unknownAvatar from "../../../assets/images/anonymous-avatar.png";
import { BackIcon, SendIcon } from "../../../assets/icon/icon";
import {
  IChat,
  IConversation,
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
  isManager?: boolean;
  handleReturnToChatList: () => void;
}

const Messages = ({
  selectedConversation,
  myProfile,
  isManager,
  handleReturnToChatList,
}: IMessagesProps) => {
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
    <div
      className={`flex-1 p-7 max-sm:p-2  flex flex-col rounded-md gap-4 ${
        isManager
          ? "bg-bgLeftNavbarLighter max-sm:pl-1 max-sm:pr-0"
          : "max-sm:pl-2"
      }`}
    >
      <div
        className={`flex gap-4 max-lg:pl-2 items-center border-b-2 pb-2 h-fit ${
          isManager ? "border-bgDarkSecondary" : "border-grayLight2"
        }`}
      >
        <BackIcon onClick={handleReturnToChatList} className="w-5 lg:hidden" />
        <img
          className="w-[50px] aspect-square object-cover rounded-full"
          src={
            selectedConversation?.receiver?.avatar
              ? selectedConversation?.receiver?.avatar
              : unknownAvatar
          }
          alt=""
        />
        <div>
          <div className="text-[20px] font-medium overflow-hidden truncate">
            {selectedConversation?.receiver?.firstName}{" "}
            {selectedConversation?.receiver?.lastName}
          </div>
          <div className="text-[14px]">
            {selectedConversation?.receiver?.email}
          </div>
        </div>
      </div>
      <div
        ref={messageContainerRef}
        className={`h-[calc(100vh_-_330px)] overflow-y-auto flex flex-col gap-2 ${
          isManager ? "darkChatScrollBar" : ""
        }`}
      >
        {loadingSttOfGetMsgs === "loading" ? (
          <Loader />
        ) : (
          msgArr &&
          msgArr.map((msg) => (
            <MessageLines
              key={msg.id}
              msg={msg}
              isMe={msg.userId === myProfile.id}
              currentConversation={currentConversation}
              myProfile={myProfile}
              isManager={isManager}
            />
          ))
        )}
      </div>
      <form onSubmit={handleSendMsg} className="h-fit flex items-center gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`w-full px-4 py-2 rounded-3xl ${
            isManager ? "bg-darkInput" : "border-2 border-[#dcdce5]"
          }`}
          placeholder="Write something to partner ..."
        />
        <button
          type="submit"
          className={`w-fit cursor-pointer px-2 py-2 rounded-full border-2 ${
            isManager
              ? "text-black border-bgDarkSecondary hover:bg-secondaryYellow bg-primaryYellow"
              : "bg-yellow-500 hover:bg-primaryYellow text-white"
          }`}
        >
          <SendIcon className="w-6" />
        </button>
      </form>
    </div>
  );
};

interface IMessageLineProps {
  msg: IMessage;
  isMe: boolean;
  myProfile: IUser;
  currentConversation: IConversation;
  isManager?: boolean;
}

const MessageLines = ({
  msg,
  isMe,
  myProfile,
  currentConversation,
  isManager,
}: IMessageLineProps) => {
  return (
    <div className="break-all">
      <div className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
        <img
          className="w-10 h-10 aspect-square object-cover rounded-full"
          src={
            isMe
              ? myProfile.avatar
                ? myProfile.avatar
                : unknownAvatar
              : currentConversation.sender.avatar
              ? currentConversation.sender.avatar
              : unknownAvatar
          }
          alt=""
        />
        <div
          className={`flex flex-col gap-2 ${
            isMe ? "items-end" : "items-start"
          }`}
        >
          <div className="flex gap-2 items-center">
            <div
              className={`h-fit font-semibold ${
                isMe ? "text-secondaryYellow" : ""
              }`}
            >
              {isMe ? "Me" : currentConversation.sender.username}
            </div>
            <div className="text-[11px] h-fit">
              {formatDateTime(msg.createdAt as string)}
            </div>
          </div>
          <div
            className={`break-all w-fit px-4 py-2 rounded-2xl max-w-[400px] max-md:max-w-[300px] max-[500px]:max-w-[220px] ${
              isMe
                ? "bg-primaryYellow text-white"
                : `${isManager ? "bg-darkInput" : "bg-grayLight2"}`
            }`}
          >
            {msg.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
