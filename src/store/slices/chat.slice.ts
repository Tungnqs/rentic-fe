import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { IPost } from "../../interfaces/post.interface";
import { RootState } from "..";
import { IUser } from "../../interfaces/userProfile.interface";

export interface IMessage {
  id?: string;
  text?: string;
  userId?: string;
  chatId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IChat {
  id: string;
  receiver: IUser;
  updatedAt?: string;
  seenBy?: string[];
  lastMessage?: string;
}

interface IChatState {
  loadingStatus: "loading" | "loaded" | "fail";
  chats: IChat[];
  currentChat: {
    sender: IUser;
    currentUser: IUser;
    createdAt?: string;
    seenBy: {
      id: string;
    }[];
    lastMessage?: IMessage;
    messages: IMessage[];
  };
}

const initialState: IChatState = {
  loadingStatus: "loading",
  chats: [],
  currentChat: {
    currentUser: {
      firstName: "",
      lastName: "",
      avatar: "",
      balance: undefined,
      email: "",
      id: "",
      isBlocked: undefined,
      isVerified: undefined,
      phonenumber: "",
      roles: [],
      username: "",
      createdAt: "",
      googleId: "",
    },
    sender: {
      firstName: "",
      lastName: "",
      avatar: "",
      balance: undefined,
      email: "",
      id: "",
      isBlocked: undefined,
      isVerified: undefined,
      phonenumber: "",
      roles: [],
      username: "",
      createdAt: "",
      googleId: "",
    },
    messages: [],
    seenBy: [],
    createdAt: "",
    lastMessage: undefined,
  },
};

export const readChat = createAsyncThunk(
  "chat/readChat",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.CHAT.READ_CHAT + chatId;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (userId: string, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.CHAT.CREATE_CHAT;
      const response = await axiosInstance.post(url, { userIds: userId });
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface ISendMessageReq {
  chatId: string;
  text: string;
}

export const sendMessage = createAsyncThunk(
  "chat/createConversation",
  async (data: ISendMessageReq, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.CHAT.SEND_MESSAGE;
      const response = await axiosInstance.post(url, data);
      return response.data.message;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getAllConversations = createAsyncThunk(
  "chat/getAllConversations",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.CHAT.GET_ALL_CHATS;
      const response = await axiosInstance.get(url);
      return response.data.chats;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllConversations.pending, (state) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(getAllConversations.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.chats = action.payload;
    });
    builder.addCase(getAllConversations.rejected, (state) => {
      state.loadingStatus = "fail";
    });
    builder.addCase(readChat.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.currentChat = action.payload;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.currentChat.messages.push(action.payload)
    });
  },
});

export const selectAllConversation = (state: RootState) =>
  state.chatState.chats || [];
export const selectCurrentConversation = (state: RootState) =>
  state.chatState.currentChat;
export const selectChatLoading = (state: RootState) =>
  state.chatState.loadingStatus;

export default chatSlice.reducer;
