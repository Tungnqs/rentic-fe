import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { ITransaction } from "../../interfaces/transaction";
import { RootState } from "..";

export interface INotificationItem {
  id: string;
  type: string;
  message: string;
  userId: string;
  createdAt: string;
  isRead: boolean;
}

interface INotificationState {
  notifications: INotificationItem[];
  notificationCount: number;
  loading: "idle" | "loading" | "loaded" | "error";
}

const initialState: INotificationState = {
  notifications: [],
  notificationCount: 0,
  loading: "idle",
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
      const url = API_BASE_URL + API_PATH_URL.NOTIFICATION.NOTIFICATION_MODIFY + notificationId + "/read/";
      const response = await axiosInstance.put(url);
      toast.success("Notification marked as read");
      return notificationId;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

interface ReadAllNotificationsPayload {
  notificationIds: string[];
}

export const readAllNotifications = createAsyncThunk(
  "notification/readAllNotifications",
  async (payload: ReadAllNotificationsPayload, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.NOTIFICATION.NOTIFICATION_READ_ALL;
      const response = await axiosInstance.put(url, payload);
      toast.success("All notifications marked as read");
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    pushNewNotification: (state, action: PayloadAction<INotificationItem>) => {
      state.notifications = [action.payload, ...state.notifications];
      state.notificationCount += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifications.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getAllNotifications.fulfilled, (state, action) => {
      state.notificationCount = 0;
      state.loading = "loaded";
      state.notifications = action.payload;
      action.payload.map((item: INotificationItem) => {
        if (!item.isRead) {
          state.notificationCount += 1;
        }
      })
    });
    builder.addCase(getAllNotifications.rejected, (state) => {
      state.loading = "error";
    });
    builder.addCase(readNotification.fulfilled, (state, action) => {
      const readNotificationIndex = state.notifications.findIndex((item) =>
        item.id === action.payload
      );
      if (readNotificationIndex !== -1 && state.notifications[readNotificationIndex].isRead === false) {
        state.notifications[readNotificationIndex].isRead = true;
        state.notificationCount -= 1;
      }
    });
  }
});

export const selectNotificationLoading = (state: RootState) => state.notification.loading;
export const selectAllNotification = (state: RootState) => state.notification.notifications;
export const selectNotificationCount = (state: RootState) => state.notification.notificationCount;
export const { pushNewNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
