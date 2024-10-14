import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";

interface IApp {
  a: string;
}

const initialState: IApp = {
  a: "",
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

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {},
  // extraReducers:{}
});

export default appSlice.reducer;
