import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";

interface IAdminState {
  a: string;
}

const initialState: IAdminState = {
  a: "",
};

export const blockUserById = createAsyncThunk(
  "admin/blockUserById",
    async(userId: string, {rejectWithValue}) => {
        try{
            const url = API_BASE_URL + API_PATH_URL.ADMIN.BLOCK_ACCOUNT_BY_ID + userId;
            const res = await axiosInstance.post(url);
            toast.success(res.data.message);
            return res.data;
        }catch(err){
            console.log('err: ', err);
            checkErr(err);
            return rejectWithValue(err);
        }
    }
);

export const unBlockUserById = createAsyncThunk(
    "admin/blockUserById",
      async(userId: string, {rejectWithValue}) => {
          try{
              const url = API_BASE_URL + API_PATH_URL.ADMIN.UNBLOCK_ACCOUNT_BY_ID + userId;
              const res = await axiosInstance.post(url);
              toast.success(res.data.message);
              return res.data;
          }catch(err){
              console.log('err: ', err);
              checkErr(err);
              return rejectWithValue(err);
          }
      }
  );

export const adminSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {},
  // extraReducers:{}
});

export default adminSlice.reducer;
