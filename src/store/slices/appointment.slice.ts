import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { IPost } from "../../interfaces/post.interface";
import { RootState } from "..";
import { IUser } from "../../interfaces/userProfile.interface";

interface IAppointment {
  loadingStatus: "loading" | "loaded" | "fail";
  appointments: {
    id: string;
    dateTime: string;
    userId: string;
    postId: string;
    createdAt?: string;
    approved: boolean;
    post: IPost;
    user?: IUser;
  }[];
}

const initialState: IAppointment = {
  loadingStatus: "loading",
  appointments: [],
};

export interface ICreateAppointment {
  postId: string;
  dateTime: string;
}

export const createAppointment = createAsyncThunk(
  "appointment/getAllAppointmentOfRenter",
  async (data: ICreateAppointment, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.APPOINTMENT.MODIFY_APPOINTMENT;
      const response = await axiosInstance.post(url, data);
      toast.success(response.data.message);
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const modifyAppointment = createAsyncThunk(
  "appointment/approveAppointment",
  async ({id, isApprove}:{id:string, isApprove:boolean}, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.APPOINTMENT.MODIFY_APPOINTMENT + "status/"+id;
      const response = await axiosInstance.put(url, {approved: isApprove});
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const deleteAppointmentById = createAsyncThunk(
  "appointment/deleteAppointmentById",
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.APPOINTMENT.MODIFY_APPOINTMENT +id;
      const response = await axiosInstance.delete(url);
      toast.success(response.data.message);
      if(response.data){
        dispatch(getAllAppointmentOfLandlord());
      }
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getAllAppointmentOfRenter = createAsyncThunk(
  "appointment/getAllAppointmentOfRenter",
  async (_, { rejectWithValue }) => {
    try {
      const url =
        API_BASE_URL + API_PATH_URL.APPOINTMENT.GET_RENTER_APPOINTMENT;
      const response = await axiosInstance.get(url);
      return response.data.appointments;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getAllAppointmentOfLandlord = createAsyncThunk(
  "appointment/getAllAppointmentOfLandlord",
  async (_, { rejectWithValue }) => {
    try {
      const url =
        API_BASE_URL + API_PATH_URL.APPOINTMENT.GET_LANDLORD_APPOINTMENT;
      const response = await axiosInstance.get(url);
      console.log('response.data.viewingAppointments: ', response.data.appointments);
      return response.data.appointments;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointmentState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAppointmentOfRenter.pending, (state) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(getAllAppointmentOfRenter.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.appointments = action.payload;
    });
    builder.addCase(getAllAppointmentOfRenter.rejected, (state) => {
      state.loadingStatus = "fail";
    });
    builder.addCase(getAllAppointmentOfLandlord.pending, (state) => {
      state.loadingStatus = "loading";
    });
    builder.addCase(getAllAppointmentOfLandlord.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.appointments = action.payload;
    });
    builder.addCase(getAllAppointmentOfLandlord.rejected, (state) => {
      state.loadingStatus = "fail";
    });
    builder.addCase(modifyAppointment.fulfilled, (state, action) => {
      const appointmentIdx = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.viewingAppointment.id
      );
      if (appointmentIdx !== -1) {
        state.appointments[appointmentIdx].approved = action.payload.viewingAppointment.approved;
      }
    });
    // builder.addCase(deleteAppointmentById.fulfilled, (state, action) => {
    //   state.appointments = action.payload;
    // });
  },
});

export const selectAllAppointments = (state:RootState)=> state.appointmentState.appointments || [];
export const selectAppointmentLoading = (state: RootState)=> state.appointmentState.loadingStatus;

export default appointmentSlice.reducer;
