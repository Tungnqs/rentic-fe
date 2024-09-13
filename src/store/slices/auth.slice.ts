import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "../../interfaces";
import { axiosInstance } from "../../lib/axios";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { deleteCookie, setCookie } from "../../utils/cookies.utils";
import { RootState } from "..";
import { IUserProfile } from "../../interfaces/userProfile.iterface";

interface IAuth {
  userRole?: string;
  isLogin: boolean;
  userProfile: IUserProfile;
}

const initialState: IAuth = {
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
      const url = API_BASE_URL + API_PATH_URL.AUTH.USER_PROFILE;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
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
      console.log("response.data: ", response.data);
      if (response.data) {
        await dispatch(getUserProfile());
      }
      return response.data;
    } catch (err) {
      console.log("err: ", err);
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
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const authLogout = createAsyncThunk(
  "auth/authLogout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      deleteCookie("token");
      dispatch(setIsLoggedIn(false));
      dispatch(clearUserProfile());
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
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      state.isLogin = true;
    });
    builder.addCase(normalLogin.fulfilled, (state, action) => {
      state.isLogin = true;
      state.userRole = action.payload.roles[0]
    });
  },
});

export const selectUserRole = (state: RootState) => state.authState.userRole;
export const selectIsLogin = (state: RootState) => state.authState.isLogin;
export const selectUserProfile = (state: RootState) =>
  state.authState.userProfile.user;
export const {
  setCurrentUserRole,
  clearCurrentUserRole,
  setIsLoggedIn,
  clearUserProfile,
} = authSlice.actions;
export default authSlice.reducer;
