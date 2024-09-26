import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { postSlice } from "./slices/post.slice";
import { appSlice } from "./slices/app.slice";
import { paymentSlice } from "./slices/payment.slice";
import { reportSlice } from "./slices/report.slice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [postSlice.name]: postSlice.reducer,
    [appSlice.name]: appSlice.reducer,
    [paymentSlice.name]: paymentSlice.reducer,
    [reportSlice.name]: reportSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
