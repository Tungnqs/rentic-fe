import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosInstance } from "../../lib/axios";
import { RootState } from "..";
import { checkErr } from "../../utils/notification.utils";

interface IChatbotState {
  chatUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IChatbotState = {
  chatUrl: null,
  isLoading: false,
  error: null,
};

export const getChatbotSession = createAsyncThunk(
  "chatbot/getChatbotSession",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.BOT.GET_CHAT_SESSION;
      const response = await axiosInstance.post(url);
      return response.data.url;
    } catch (err) {
      console.log("Error fetching chatbot session:", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const chatbotSlice = createSlice({
  name: "chatbotState",
  initialState,
  reducers: {
    resetChatbotError: (state) => {
      state.error = null;
    },
    resetChatbotState: (state) => {
      state.chatUrl = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatbotSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatbotSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatUrl = action.payload;
        state.error = null;
      })
      .addCase(getChatbotSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch chatbot session";
      });
  },
});

export const { resetChatbotError, resetChatbotState } = chatbotSlice.actions;

export const selectChatbotUrl = (state: RootState) => state.chatbotState.chatUrl;
export const selectChatbotLoading = (state: RootState) => state.chatbotState.isLoading;
export const selectChatbotError = (state: RootState) => state.chatbotState.error;

export default chatbotSlice.reducer;