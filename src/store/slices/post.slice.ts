import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { RootState } from "..";
import { IPost } from "../../interfaces/post.interface";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";

interface IPostData {
  allPosts: IPost[];
  postDetail: IPost;
  isLoading: "loading" | "loaded" | "fail";
}

const initialState: IPostData = {
  isLoading: "loading",
  allPosts: [],
  postDetail: {
    desc: "",
    bathroom: 0,
    bedroom: 0,
    commune: "",
    district: "",
    latitude: 0,
    longitude: 0,
    type: "",
    pet: undefined,
    size: undefined,
    address: "",
    city: "",
    id: "",
    images: [
      {
        name: "",
        path: "",
      }
    ],
    price: 0,
    property: "",
    title: "",
    user: {
      avatar: "",
      email: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      username: "",
    },
  },
};

export const getAllMyPosts = createAsyncThunk(
  "landlord/getAllMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_ALL_MY_POSTS;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
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
      toast.success(response.data.message);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const editPost = createAsyncThunk(
  "landlord/editPost",
  async (
    { formData, postId }: { formData: FormData; postId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.MODIFY_POST_BY_ID + postId;
      const response = await axiosFormData.put(url, formData);
      if (response.data) {
        await dispatch(getPostById({postId: postId}));
      }
      toast.success(response.data.message);
      console.log('response.data: ', response.data);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const deletePostById = createAsyncThunk(
  "landlord/deletePostById",
  async ({ postId }: { postId: string }, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.MODIFY_POST_BY_ID + postId;
      const response = await axiosInstance.delete(url);
      if (response.data) {
        await dispatch(getAllMyPosts());
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

export const getPostById = createAsyncThunk(
  "landlord/getPostById",
  async ({ postId }: { postId: string }, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_POST_BY_ID + postId;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err:any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMyPosts.pending, (state, action) => {
      state.isLoading = "loading";
    });
    builder.addCase(getAllMyPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
      state.isLoading = "loaded";
    });
    builder.addCase(getAllMyPosts.rejected, (state, action) => {
      state.isLoading = "fail";
    });
    builder.addCase(getPostById.pending, (state, action) => {
      state.isLoading = "loading";
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.postDetail = action.payload;
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.isLoading = "fail";
    });
  },
});

export const selectAllMyPosts = (state: RootState) => state.postState.allPosts;
export const selectCurrentPost = (state: RootState) =>
  state.postState.postDetail;
export const selectLoadingStatus = (state: RootState) =>
  state.postState.isLoading;

export default postSlice.reducer;
