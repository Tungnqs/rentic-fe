import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "../../interfaces";
import { axiosInstance } from "../../lib/axios";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { setCookie } from "../../utils/cookies.utils";
import { RootState } from "..";
import { IUserProfile } from "../../interfaces/userProfile";

interface IAuth {
  userRole?: string;
  isLogin: boolean;
  userProfile: IUserProfile;
}

const initialState: IAuth = {
  userRole: "",
  isLogin: false,
  userProfile: {
    userProfile: {
      avatar: "",
      balance: undefined,
      email: "",
      id: "",
      isBlocked: undefined,
      isVerified: undefined,
      phonenumber: "",
      roles: [],
      username: "",
    },
  },
};

export const registerAccount = createAsyncThunk(
  "auth/register",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.REGISTER;
      const response = await axiosInstance.post(url, data);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.GET_USER_PROFILE;
      const response = await axiosInstance.get(url);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
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
      console.log(response.data);
      dispatch(setCurrentUserRole(response.data.roles[0]));
      dispatch(getUserProfile());
      return true;
    } catch (err) {
      console.log(err);
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
    clearUserProfile: (state) => {
      state.userProfile = {
        userProfile: {
          avatar: "",
          email: "",
          id: "",
          phonenumber: "",
          roles: [],
          username: "",
          balance: undefined,
          isBlocked: undefined,
          isVerified: undefined,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
});

export const selectUserRole = (state: RootState) => state.authState.userRole;
export const selectIsLogin = (state: RootState) => state.authState.isLogin;
export const selectUserProfile = (state: RootState) => state.authState.userProfile;
export const { setCurrentUserRole, clearCurrentUserRole, setIsLoggedIn, clearUserProfile } =
  authSlice.actions;
export default authSlice.reducer;
