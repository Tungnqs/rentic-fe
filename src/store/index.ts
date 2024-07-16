import { configureStore } from "@reduxjs/toolkit";
import itemState from "./slices/item";

const store = configureStore({
  reducer: {
    [itemState.name]: itemState.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
