import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { RootState } from "..";
import { IPost } from "../../interfaces/post.interface";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { IAds } from "../../interfaces/ads.interface";

interface IPostData {
  myAds: IAds[];
  post: IPost[];
  postDetail: IPost;
  isLoading: "loading" | "loaded" | "fail";
  adsLoading: "loading" | "loaded" | "fail";
}

const initialState: IPostData = {
  myAds: [],
  isLoading: "loading",
  adsLoading: "loading",
  post: [],
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
    isReported: undefined,
    isVerified: undefined,
    address: "",
    city: "",
    id: "",
    images: [
      {
        name: "",
        path: "",
      },
    ],
    price: 0,
    property: "",
    title: "",
    user: {
      id: "",
      avatar: "",
      email: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      username: "",
    },
  },
};

export const getAllMyAds = createAsyncThunk(
  "landlord/getAllMyAds",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADVERTISEMENT.GET_ALL_MY_ADS;
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export interface IAdsRequest {
  startDate: string;
  endDate: string;
  postId: string;
  adPackageId: string;
}

export const createNewAds = createAsyncThunk(
  "landlord/createNewAds",
  async (data: IAdsRequest, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADVERTISEMENT.ADS_MODIFY;
      const response = await axiosInstance.post(url, data);
      if (response.data.data) {
        dispatch(getAllMyAds());
      }
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

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

export const getAllUserPosts = createAsyncThunk(
  "moderator/getAllUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_ALL_POSTS;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getAllPublishPosts = createAsyncThunk(
  "renter/getAllPublishPosts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_PUBLISH_POST;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err: any) {
      console.log("err: ", err);
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
        await dispatch(getPostById({ postId: postId }));
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
    } catch (err: any) {
      console.log("err: ", err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const verifyPost = createAsyncThunk(
  "moderator/verifyPost",
  async ({ postId }: { postId: string }, { rejectWithValue, dispatch }) => {
    try {
      const url =
        API_BASE_URL + API_PATH_URL.MODERATOR.MODIFY_POST + postId + "/verify";
      const response = await axiosInstance.post(url);
      if (response.data) {
        dispatch(getAllUserPosts());
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

export const unVerifyPost = createAsyncThunk(
  "moderator/verifyPost",
  async ({ postId }: { postId: string }, { rejectWithValue, dispatch }) => {
    try {
      const url =
        API_BASE_URL +
        API_PATH_URL.MODERATOR.MODIFY_POST +
        postId +
        "/unverify";
      const response = await axiosInstance.post(url);
      if (response.data) {
        dispatch(getAllUserPosts());
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

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMyPosts.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getAllMyPosts.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isLoading = "loaded";
    });
    builder.addCase(getAllMyPosts.rejected, (state) => {
      state.isLoading = "fail";
    });
    builder.addCase(getPostById.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.postDetail = action.payload;
    });
    builder.addCase(getPostById.rejected, (state) => {
      state.isLoading = "fail";
    });
    builder.addCase(getAllUserPosts.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getAllUserPosts.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isLoading = "loaded";
    });
    builder.addCase(getAllUserPosts.rejected, (state) => {
      state.isLoading = "fail";
    });
    builder.addCase(getAllPublishPosts.pending, (state) => {
      state.isLoading = "loading";
    });
    builder.addCase(getAllPublishPosts.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isLoading = "loaded";
    });
    builder.addCase(getAllPublishPosts.rejected, (state) => {
      state.isLoading = "fail";
    });
    builder.addCase(verifyPost.fulfilled, (state, action) => {
      state.postDetail.isVerified = action.payload.post.isVerified;
    });
    builder.addCase(getAllMyAds.pending, (state) => {
      state.adsLoading = "loading";
    });
    builder.addCase(getAllMyAds.fulfilled, (state, action) => {
      state.myAds = action.payload;
      state.adsLoading = "loaded";
    });
    builder.addCase(getAllMyAds.rejected, (state) => {
      state.adsLoading = "fail";
    });
  },
});

export const selectAllFetchedPosts = (state: RootState) => state.postState.post;
export const selectCurrentPost = (state: RootState) =>
  state.postState.postDetail;
export const selectLoadingStatus = (state: RootState) =>
  state.postState.isLoading;
export const selectAdsLoadingStatus = (state: RootState) =>
  state.postState.adsLoading;
export const selectAllMyAds = (state: RootState) => state.postState.myAds;

export default postSlice.reducer;
