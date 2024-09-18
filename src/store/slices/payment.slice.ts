import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkErr } from "../../utils/notification.utils";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { IPaymentDetail } from "../../interfaces/paymentDetail.interface";
import { RootState } from "..";

interface IPayment {
  paymentDetail: IPaymentDetail;
  isLoading: "loading" | "loaded" | "fail";
}

const initialState: IPayment = {
  isLoading: "loading",
  paymentDetail: {
    data: {
      amount: 0,
      amountPaid: 0,
      amountRemaining: 0,
      createdAt: "",
      id: "",
      orderCode: 0,
      status: undefined,
    },
    existingTransaction: {
      description: "",
    },
    userData: {
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
  },
};

export interface IDataForCreatePaymentLink {
  amount: number;
  returnUrl: string;
  cancelUrl: string;
}

export const createPaymentLink = createAsyncThunk(
  "payment/createPaymentLink",
  async (data: IDataForCreatePaymentLink, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.PAYMENT.CREATE_PAYMENT_LINK;
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (id: string, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.PAYMENT.GET_ORDER + id;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const paymentSlice = createSlice({
  name: "paymentState",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(getPaymentById.pending, (state)=>{
      state.isLoading = "loading"
    });
    builder.addCase(getPaymentById.fulfilled, (state, action)=>{
      state.isLoading = "loaded";
      state.paymentDetail = action.payload;
    })
    builder.addCase(getPaymentById.rejected, (state)=>{
      state.isLoading = "fail";
    })
  }
});

export const selectCurrentTransaction = (state: RootState) => state.paymentState.paymentDetail;
export const selectPaymentLoading = (state: RootState) => state.paymentState.isLoading;
export default paymentSlice.reducer;
