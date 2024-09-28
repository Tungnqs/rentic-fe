import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkErr } from "../../utils/notification.utils";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosInstance } from "../../lib/axios";
import { RootState } from "..";
import { toast } from "react-toastify";

interface IReport {
  id?: string;
  reason?: string;
  postId?: string;
  userId?: string;
  createdAt?: string;
  status?: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phonenumber: string;
    avatar: string;
  };
  post: {
    id?: string;
    title?: string;
  };
}

interface IReportState {
  loadingStatus: "loading" | "loaded" | "fail";
  allReports: IReport[];
}

const initialState: IReportState = {
  loadingStatus: "loading",
  allReports: [],
};

export const getAllReports = createAsyncThunk(
  "moderator/getAllReports",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.MODERATOR.REPORT_ACTION;
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface IReportPostBody{
  reason: string;
  postId: string;
}

export const reportPostById = createAsyncThunk(
  "renter/reportPostById",
  async ( data: IReportPostBody, { rejectWithValue }) => {
    try{
      const url = API_BASE_URL + API_PATH_URL.REPORT.REPORT_POST_BY_ID;
      const res = await axiosInstance.post(url, data);
      toast.success(res.data.message);
      return res.data;
    }catch(err: any){
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
)

export const approveReportById = createAsyncThunk(
  "moderator/approvePostById",
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.MODERATOR.REPORT_ACTION + id + "/accept";
      const res = await axiosInstance.post(url);
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const deleteReportById = createAsyncThunk(
    "moderator/deletePostById",
    async (id:string, { rejectWithValue, dispatch }) => {
      try {
        const url = API_BASE_URL + API_PATH_URL.MODERATOR.REPORT_ACTION + id;
        const res = await axiosInstance.delete(url);
        console.log('res: ', res.data);
        toast.success(res.data.message);
        if (res.data) {
          dispatch(getAllReports());
        }
        return res.data;
      } catch (err: any) {
        console.log("err: ", err);
        checkErr(err);
        return rejectWithValue(err);
      }
    }
  );

export const reportSlice = createSlice({
  name: "reportState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReports.pending, (state) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(getAllReports.fulfilled, (state, action) => {
      state.allReports = action.payload;
      state.loadingStatus = "loaded";
    });
    builder.addCase(getAllReports.rejected, (state) => {
      state.loadingStatus = "fail";
    });
    builder.addCase(approveReportById.fulfilled, (state, action) => {
      const reportIndex = state.allReports.findIndex(
        (report) => report.id === action.payload.report.id
      );
      console.log('reportIndex: ', reportIndex);
      if (reportIndex !== -1) {
        state.allReports[reportIndex].status = action.payload.report.status;
      }
    });
  },
});

export const selectAllReport = (state: RootState) =>
  state.reportState.allReports;
export const selectLoadingStatus = (state: RootState) =>
  state.reportState.loadingStatus;
export default reportSlice.reducer;
