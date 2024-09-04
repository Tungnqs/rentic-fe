import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData } from "../../lib/axios";

interface IApp {
  a: string;
}

const initialState: IApp = {
  a: "",
};

export const handleUploadFile = createAsyncThunk(
  "app/handleUploadFile",
  async ({ formData }: { formData: FormData }, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.UPLOAD_FILE_TO_FIREBASE;
      const response = await axiosFormData.post(url, formData);
      console.log("response.data: ", response.data);
      return response.data;
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err);
    }
  }
);

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {},
  // extraReducers:{}
});

export default appSlice.reducer;
