import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { IUser } from "../../interfaces/userProfile.interface";
import { RootState } from "..";
import { IPackage } from "../../interfaces/ads.interface";

interface IAdminState {
  allPackages: IPackage[],
  allAccounts: IUser[];
  loadingStatus: "loading" | "loaded" | "fail";
}

const initialState: IAdminState = {
  allPackages: [],
  allAccounts: [],
  loadingStatus: "loading",
};

export const getAllPackages = createAsyncThunk(
  "admin/getAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADMIN.MODIFY_PACKAGE;
      const res = await axiosInstance.get(url);
      return res.data.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface IAddPackageReq{
  name: string;
  dailyRate: number;
  description: string;
}

export const addNewPackage = createAsyncThunk(
  "admin/addNewPackage",
  async (data: IAddPackageReq, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADMIN.MODIFY_PACKAGE;
      const res = await axiosInstance.post(url, data);
      toast.success(res.data.message);
      return res.data.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getAllAccounts = createAsyncThunk(
  "admin/getAllAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADMIN.GET_ALL_ACCOUNTS;
      const res = await axiosInstance.get(url);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const blockUserById = createAsyncThunk(
  "admin/blockUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const url =
        API_BASE_URL + API_PATH_URL.ADMIN.BLOCK_ACCOUNT_BY_ID + userId;
      const res = await axiosInstance.post(url);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const unBlockUserById = createAsyncThunk(
  "admin/unBlockUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const url =
        API_BASE_URL + API_PATH_URL.ADMIN.UNBLOCK_ACCOUNT_BY_ID + userId;
      const res = await axiosInstance.post(url);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const adminSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccounts.pending, (state) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.allAccounts = action.payload;
    });
    builder.addCase(getAllAccounts.rejected, (state) => {
      state.loadingStatus = "fail";
    });
    builder.addCase(blockUserById.fulfilled, (state, action) => {
      const blockedAccountIdx = state.allAccounts.findIndex(
        (account) => account.id === action.payload.user.id
      )
      if(blockedAccountIdx !== -1){
        state.allAccounts[blockedAccountIdx].isBlocked = true
      }
    });
    builder.addCase(unBlockUserById.fulfilled, (state, action) => {
      const unblockedAccountIdx = state.allAccounts.findIndex(
        (account) => account.id === action.payload.user.id
      )
      if(unblockedAccountIdx !== -1){
        state.allAccounts[unblockedAccountIdx].isBlocked = false;
      }
    });
    builder.addCase(getAllPackages.pending, (state) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(getAllPackages.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.allPackages = action.payload;
    });
    builder.addCase(getAllPackages.rejected, (state) => {
      state.loadingStatus = "fail";
    });
    builder.addCase(addNewPackage.fulfilled, (state, action) => {
      state.allPackages.push(action.payload);
    });
  },
});

export const selectAdminLoadingStatus = (state: RootState) => state.adminState.loadingStatus;
export const selectAllUserAccounts = (state: RootState) => state.adminState.allAccounts;
export const selectAllPackages = (state: RootState) => state.adminState.allPackages;

export default adminSlice.reducer;
