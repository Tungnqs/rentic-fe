import { configureStore } from "@reduxjs/toolkit";
import itemState from "./slices/item";
import { authenticationState } from "./slices/authentication.slice";

const store = configureStore({
  reducer: {
    [authenticationState.name]: authenticationState.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
