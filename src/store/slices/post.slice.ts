import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, API_PATH_URL } from "../../config/api";
import { axiosFormData, axiosInstance } from "../../lib/axios";
import { RootState } from "..";
import { IPost } from "../../interfaces/post.interface";
import { toast } from "react-toastify";
import { checkErr } from "../../utils/notification.utils";
import { IAds } from "../../interfaces/ads.interface";
import { getUserProfile } from "./auth.slice";

interface IPostData {
  ads: IAds[];
  post: IPost[];
  savedPosts: IPost[]
  postDetail: IPost;
  tenLatestPosts: IPost[];
  latestPostsLoading: "loading" | "loaded" | "fail";
  isLoading: "loading" | "loaded" | "fail";
  adsLoading: "loading" | "loaded" | "fail";
  savedPostsLoading: "not loaded" | "loading" | "loaded" | "fail";
}

const initialState: IPostData = {
  ads: [],
  isLoading: "loading",
  adsLoading: "loading",
  latestPostsLoading: "loading",
  tenLatestPosts: [],
  post: [],
  savedPostsLoading: "not loaded",
  savedPosts: [],
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

export const getAllUserAds = createAsyncThunk(
  "moderator/getAllUserAds",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADVERTISEMENT.ADS_MODIFY;
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const getHomepageAds = createAsyncThunk(
  "user/getHomepageAds",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADVERTISEMENT.GET_PUBLISHED_ADS;
      const response = await axiosInstance.get(url);
      return response.data;
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
        dispatch(getUserProfile());
      }
      toast.success(response.data.message)
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const deleteAdsById = createAsyncThunk(
  "landlord/deleteAdsById",
  async (adsId: string, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADVERTISEMENT.ADS_MODIFY + adsId;
      const response = await axiosInstance.delete(url);
      toast.success(response.data.message);
      if (response.data.message) {
        dispatch(getUserProfile());
      }
      return adsId;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const moderatorAdsModify = createAsyncThunk(
  "moderator/moderatorAdsModify",
  async ({adsId, isActive} : {adsId: string, isActive:boolean}, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.ADVERTISEMENT.ADS_MODIFY + adsId;
      const response = await axiosInstance.put(url, {isActive: !isActive});
      toast.success(response.data.message);
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

export const getAllMySavedPosts = createAsyncThunk(
  "renter/getAllMySavedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_MY_SAVED_POSTS;
      const response = await axiosInstance.get(url);
      return response.data.savedPosts;
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

export const getTenLatestPosts = createAsyncThunk(
  "guest/getTenLatestPosts",
  async (_, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_10_LATEST_POSTS;
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

export const getPublishedPostDetailById = createAsyncThunk(
  "landlord/getPostById",
  async ({ postId }: { postId: string }, { rejectWithValue }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.GET_PUBLISHED_POST_BY_ID + postId;
      const response = await axiosInstance.get(url);
      return response.data.data;
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

export const savePostById = createAsyncThunk(
  "renter/savePostById",
  async (postId: string, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.SAVE_POST_BY_ID;
      const response = await axiosInstance.post(url, {postId: postId});
      toast.success(response.data.message);
      if(response.data){
        dispatch(getAllPublishPosts());
      }
      return response.data.savedPost;
    } catch (err: any) {
      console.log(err);
      checkErr(err);
      return rejectWithValue(err);
    }
  }
);

export const unSavePostById = createAsyncThunk(
  "renter/unSavePostById",
  async (postId: string, { rejectWithValue, dispatch }) => {
    try {
      const url = API_BASE_URL + API_PATH_URL.POST.UNSAVED_POST_BY_ID;
      const response = await axiosInstance.post(url, {postId: postId});
      toast.success(response.data.message);
      if(response.data){
        dispatch(getAllPublishPosts());
      }
      return postId;
    } catch (err: any) {
      console.log(err);
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
    //getAllMyPosts - landlord
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

    //getPostById - view post detail
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

    //getAllUserPosts - get all posts
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

    //getAllPublishPosts
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

    //verifyPost
    builder.addCase(verifyPost.fulfilled, (state, action) => {
      state.postDetail.isVerified = action.payload.post.isVerified;
    });

    //getAllMyAds - landlord
    builder.addCase(getAllMyAds.pending, (state) => {
      state.adsLoading = "loading";
    });
    builder.addCase(getAllMyAds.fulfilled, (state, action) => {
      state.ads = action.payload;
      state.adsLoading = "loaded";
    });
    builder.addCase(getAllMyAds.rejected, (state) => {
      state.adsLoading = "fail";
    });

    //getHomepageAds - homepage
    builder.addCase(getHomepageAds.pending, (state) => {
      state.adsLoading = "loading";
    });
    builder.addCase(getHomepageAds.fulfilled, (state, action) => {
      state.ads = action.payload;
      state.adsLoading = "loaded";
    });
    builder.addCase(getHomepageAds.rejected, (state) => {
      state.adsLoading = "fail";
    });

    //deleteAdsById
    builder.addCase(deleteAdsById.fulfilled, (state, action) => {
      const newArr = state.ads.filter((ad)=>{
        return ad.id !== action.payload
      })
      state.ads = newArr;
    });

    //getAllUserAds - get all ads
    builder.addCase(getAllUserAds.pending, (state) => {
      state.adsLoading = "loading";
    });
    builder.addCase(getAllUserAds.fulfilled, (state, action) => {
      state.ads = action.payload;
      state.adsLoading = "loaded";
    });
    builder.addCase(getAllUserAds.rejected, (state) => {
      state.adsLoading = "fail";
    });

    //getTenLatestPosts
    builder.addCase(getTenLatestPosts.pending, (state) => {
      state.latestPostsLoading = "loading";
    });
    builder.addCase(getTenLatestPosts.fulfilled, (state, action) => {
      state.tenLatestPosts = action.payload;
      state.latestPostsLoading = "loaded";
    });
    builder.addCase(getTenLatestPosts.rejected, (state) => {
      state.latestPostsLoading = "fail";
    });

    builder.addCase(moderatorAdsModify.fulfilled, (state, action) => {
      const adsIndex = state.ads.findIndex(
        (ads) => ads.id === action.payload.id
      );
      if (adsIndex !== -1) {
        state.ads[adsIndex].isActive = action.payload.isActive;
      }
    });

    //renter - get my saved posts
    builder.addCase(getAllMySavedPosts.pending, (state) => {
      state.savedPostsLoading = "loading";
    });
    builder.addCase(getAllMySavedPosts.fulfilled, (state, action) => {
      state.savedPosts = action.payload;
      state.savedPostsLoading = "loaded";
    });
    builder.addCase(getAllMySavedPosts.rejected, (state) => {
      state.savedPostsLoading = "fail";
    });

    builder.addCase(unSavePostById.fulfilled, (state, action) => {
      const newArray = state.savedPosts.filter((post) => post.id !== action.payload);
      state.savedPosts = newArray;
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
export const selectFetchedAds = (state: RootState) => state.postState.ads;
export const selectLatestPosts = (state: RootState) => state.postState.tenLatestPosts;
export const selectAllMySavedPosts = (state:RootState) => state.postState.savedPosts;
export const selectSavedPostLoading = (state: RootState) => state.postState.savedPostsLoading;

export default postSlice.reducer;
