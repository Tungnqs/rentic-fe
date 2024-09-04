import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { RootState } from "..";
import { IAllPosts } from "../../interfaces/post.interface";

interface IPostData {
  allPosts: IAllPosts[];
}

const initialState: IPostData = {
  allPosts: [],
};

export const getAllMyPosts = createAsyncThunk(
  "landlord/getAllMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_ALL_MY_POSTS;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const createPost = createAsyncThunk(
  "landlord/createPost",
  async (
    { formData }: { formData: FormData },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.CREATE_POST;
      const response = await axiosFormData.post(url, formData);
      if (response.data) {
        await dispatch(getAllMyPosts());
      }
      return response.data;
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err);
    }
  }
);

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMyPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
    });
  },
});

export const selectAllMyPosts = (state: RootState) => state.postState.allPosts;

export default postSlice.reducer;
