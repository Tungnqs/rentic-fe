import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "../../interfaces";
import { axiosInstance } from "../../lib/axios";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { setCookie } from "../../utils/cookies.utils";
import { RootState } from "..";



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
      alert(err);
      return rejectWithValue(err);
    }
  }
);

interface IAuth {
  userRole?: string;
}

const initialState: IAuth = {
  userRole: "",
};

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
  },
  extraReducers: (builder) => {},
});

export const selectUserRole = (state: RootState) => state.authState.userRole;

export const { setCurrentUserRole, clearCurrentUserRole } = authSlice.actions;
export default authSlice.reducer;
