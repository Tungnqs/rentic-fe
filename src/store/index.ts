import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { postSlice } from "./slices/post.slice";
import { appSlice } from "./slices/app.slice";
import { paymentSlice } from "./slices/payment.slice";
import { reportSlice } from "./slices/report.slice";
import {adminSlice} from "./slices/admin.slice";
import {appointmentSlice} from "./slices/appointment.slice";
import { chatSlice } from "./slices/chat.slice";
import { chatbotSlice } from "./slices/chatbot.slice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [postSlice.name]: postSlice.reducer,
    [appSlice.name]: appSlice.reducer,
    [paymentSlice.name]: paymentSlice.reducer,
    [reportSlice.name]: reportSlice.reducer,
    [adminSlice.name]: adminSlice.reducer,
    [appointmentSlice.name]: appointmentSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [chatbotSlice.name]: chatbotSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
