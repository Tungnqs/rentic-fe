import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { ITransaction } from "../../interfaces/transaction";
import { RootState } from "..";

interface IApp {
  allMyTransactions: ITransaction[],
  fetchMyTransactionsLoading: "not loaded" | "loading" | "loaded" | "fail",
}

const initialState: IApp = {
  fetchMyTransactionsLoading: "not loaded",
  allMyTransactions: [],
};

export const formatMoney = (number: number) => {
  if (number === 0) {
    return 0;
  }
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const handleUploadFile = createAsyncThunk(
  "app/handleUploadFile",
  async ({ formData }: { formData: FormData }, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.UPLOAD_FILE_TO_FIREBASE;
      const response = await axiosFormData.post(url, formData);
      console.log("response.data: ", response.data);
      toast.success("Upload image successfully!");
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const fetchAllMyTransactions = createAsyncThunk(
  "app/fetchAllMyTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.TRANSACTION.FETCH_MY_TRANSACTIONS;
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchAllMyTransactions.pending, (state) => {
      state.fetchMyTransactionsLoading = "loading";
    });
    builder.addCase(fetchAllMyTransactions.fulfilled, (state, action) => {
      state.fetchMyTransactionsLoading = "loaded";
      state.allMyTransactions = action.payload;
    });
    builder.addCase(fetchAllMyTransactions.rejected, (state) => {
      state.fetchMyTransactionsLoading = "fail";
    });
  }
});

export const selectAllMyTransactions = (state: RootState) => state.appState.allMyTransactions;
export const selectFetchMyTransactionsLoading = (state: RootState) => state.appState.fetchMyTransactionsLoading;

export default appSlice.reducer;
