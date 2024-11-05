import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "../../interfaces";
import { axiosInstance } from "../../lib/axios";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { checkAccessToken, deleteCookie, setCookie } from "../../utils/cookies.utils";
import { RootState } from "..";
import { IUserProfile } from "../../interfaces/userProfile.interface";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";

interface IAuth {
  authLoading: "loading" | "loaded" | "fail",
  otpSendingStatus: "sending" | "sent" | "not sent";
  userRole?: string;
  isLogin: boolean;
  userProfile: IUserProfile;
  forgetPswSendingStatus: "sending" | "sent" | "not sent"  | "fail";
}

const initialState: IAuth = {
  otpSendingStatus: "not sent",
  forgetPswSendingStatus: "not sent",
  authLoading: "loading",
  userRole: "",
  isLogin: false,
  userProfile: {
    user: {
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

export const registerAccount = createAsyncThunk(
  "auth/register",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.REGISTER;
      const response = await axiosInstance.post(url, data);
      toast.success(response.data.message);
      console.log("response.data: ", response.data);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const sendOtpForVerification = createAsyncThunk(
  "auth/sendOtpForVerification",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.SEND_VERIFICATION_OTP;
      const response = await axiosInstance.post(url);
      toast.success(response.data.message);
      console.log("response.data: ", response.data);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otp: string, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.VERIFY_OTP;
      const response = await axiosInstance.post(url, {otp: otp});
      toast.success(response.data.message);
      console.log("response.data: ", response.data);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.USER_PROFILE;
      const response = await axiosInstance.get(url);
      checkAccessToken(response.data.accessToken);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface IEditProfileReq {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
}

export const editUserProfile = createAsyncThunk(
  "auth/editUserProfile",
  async (data: IEditProfileReq, { dispatch, rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.USER_PROFILE;
      const response = await axiosInstance.put(url, data);
      if (response.data) {
        await dispatch(getUserProfile());
      }
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface IChangeMyPasswordReq{
  currentPassword: string;
  newPassword: string;
}

export const changeMyPassword = createAsyncThunk(
  "auth/changeMyPassword",
  async (data: IChangeMyPasswordReq, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.CHANGE_PASSWORD;
      const response = await axiosInstance.post(url, data);
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const normalLogin = createAsyncThunk(
  "auth/normalLogin",
  async (data: ILogin, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.LOGIN;
      const response = await axiosInstance.post(url, data);
      setCookie("token", response.data.token);
      dispatch(getUserProfile());
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.FORGET_PASSWORD;
      const response = await axiosInstance.post(url, {email: email});
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface IResetPasswordReq{
  email: string;
  token: string;
  newPassword: string;
}

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: IResetPasswordReq, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.RESET_PASSWORD;
      const response = await axiosInstance.post(url, data);
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const authLogout = createAsyncThunk(
  "auth/authLogout",
  async ({ isChangePsw }: { isChangePsw?: boolean } = {}, { rejectWithValue, dispatch }) => {
    try {
      await deleteCookie("token");
      dispatch(setIsLoggedIn(false));
      dispatch(clearUserProfile());
      dispatch(setAuthLoading("loading"))
      if(!isChangePsw){
        toast.success("Logout successfully!");
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setCurrentUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    clearCurrentUserRole: (state) => {
      state.userRole = "";
    },
    setIsLoggedIn: (state, action) => {
      state.isLogin = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = {
        user: {
          firstName: "",
          lastName: "",
          avatar: "",
          email: "",
          id: "",
          phonenumber: "",
          roles: [],
          username: "",
          balance: undefined,
          isBlocked: undefined,
          isVerified: undefined,
          createdAt: "",
          googleId: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.authLoading = "loading";
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.authLoading = "loaded";
      state.userProfile = action.payload;
      state.isLogin = true;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.authLoading = "fail";
    });
    builder.addCase(normalLogin.fulfilled, (state, action) => {
      state.isLogin = true;
      state.userRole = action.payload.roles[0];
    });
    builder.addCase(sendOtpForVerification.pending, (state) => {
      state.otpSendingStatus = "sending";
    });
    builder.addCase(sendOtpForVerification.fulfilled, (state, action) => {
      state.otpSendingStatus = "sent";
    });
    builder.addCase(sendOtpForVerification.rejected, (state) => {
      state.otpSendingStatus = "not sent";
    });
    builder.addCase(forgetPassword.pending, (state) => {
      state.forgetPswSendingStatus = "sending";
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.forgetPswSendingStatus = "sent";
    });
    builder.addCase(forgetPassword.rejected, (state) => {
      state.forgetPswSendingStatus = "fail";
    });
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.userProfile.user.isVerified = true;
    });
  },
});

export const selectUserRole = (state: RootState) => state.authState.userRole;
export const selectIsLogin = (state: RootState) => state.authState.isLogin;
export const selectAuthLoading = (state: RootState) => state.authState.authLoading;
export const selectOtpSendingStatus = (state: RootState) => state.authState.otpSendingStatus;
export const selectForgetPswSendingStatus = (state: RootState) => state.authState.forgetPswSendingStatus;
export const selectUserProfile = (state: RootState) =>
  state.authState.userProfile.user;
export const {
  setCurrentUserRole,
  clearCurrentUserRole,
  setIsLoggedIn,
  clearUserProfile,
  setAuthLoading,
} = authSlice.actions;
export default authSlice.reducer;
