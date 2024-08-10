import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "../../interfaces";
import { axiosInstance } from "../../lib/axios";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { setCookie } from "../../utils/cookies.utils";

export const normalLogin = createAsyncThunk(
  "authentication/normalLogin",
  async (data: ILogin, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.LOGIN;
      const response = await axiosInstance.post(url, data);
      setCookie("token", response.data.token);
      console.log("login successfully");
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const registerAccount = createAsyncThunk(
  "authentication/register",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.AUTH.REGISTER;
      const response = await axiosInstance.post(url, data);
      console.log(response.data);
      return response.data;
    } catch(err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const initialState = null;

export const authenticationState = createSlice({
  name: "authenticationState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
