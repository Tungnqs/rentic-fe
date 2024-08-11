import { configureStore } from "@reduxjs/toolkit";
import itemState from "./slices/item";
import { authSlice } from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
