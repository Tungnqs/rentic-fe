import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { ITransaction } from "../../interfaces/transaction";
import { RootState } from "..";

export interface INotificationItem{
    id: string;
    type: string;
    message: string;
    userId: string;
    createdAt: string;
    isRead: boolean;
}

interface INotificationState {
  notificationLoading: "not loaded" | "loading" | "loaded" | "fail",
  allNotifications: INotificationItem[];
  notificationCount: number;
}

const initialState: INotificationState = {
  notificationLoading: "not loaded",
  allNotifications: [],
  notificationCount: 0
};

export const getAllNotifications = createAsyncThunk(
  "notification/fetchAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.NOTIFICATION.NOTIFICATION_MODIFY;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const readNotification = createAsyncThunk(
    "notification/readNotification",
    async (notificationId: string, { rejectWithValue }) => {
      try {
        const url = API_BASE_URL + API_PATH_URL.NOTIFICATION.NOTIFICATION_MODIFY+ notificationId + "/read/";
        const response = await axiosInstance.put(url);
        return notificationId;
      } catch (err: any) {
        console.log("err: ", err);
        checkErr(err);
        return rejectWithValue(err);
      }
    }
  );

export const notificationSlice = createSlice({
  name: "notificationState",
  initialState,
  reducers: {
    pushNewNotification: (state, action)=>{
      state.allNotifications = [action.payload, ...state.allNotifications];
      state.notificationCount += 1;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllNotifications.pending, (state) => {
      state.notificationLoading = "loading";
    });
    builder.addCase(getAllNotifications.fulfilled, (state, action) => {
      state.notificationCount = 0;
      state.notificationLoading = "loaded";
      state.allNotifications = action.payload;
      action.payload.map((item: INotificationItem) => {
        if(!item.isRead){
            state.notificationCount += 1;
        }
      })
    });
    builder.addCase(getAllNotifications.rejected, (state) => {
      state.notificationLoading = "fail";
    });
    builder.addCase(readNotification.fulfilled, (state, action) => {
      const readNotificationIndex = state.allNotifications.findIndex((item) =>
        item.id === action.payload
      );
      if(readNotificationIndex !== -1 && state.allNotifications[readNotificationIndex].isRead === false){
        state.allNotifications[readNotificationIndex].isRead = true;
        state.notificationCount -= 1;
      }
    });
  }
});

export const selectNotificationLoading = (state:RootState) => state.notificationState.notificationLoading;
export const selectAllNotification = (state: RootState) => state.notificationState.allNotifications;
export const selectNotificationCount = (state: RootState) => state.notificationState.notificationCount;
export const {pushNewNotification} = notificationSlice.actions;

export default notificationSlice.reducer;
