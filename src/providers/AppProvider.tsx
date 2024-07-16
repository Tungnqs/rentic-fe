import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import App from "../App";
import UserProvider from "./UserProvider";

interface IAppProviderProps {
  children: JSX.Element;
}

export default function AppProvider({ children }: IAppProviderProps) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <UserProvider>{children}</UserProvider>
      </Provider>
    </BrowserRouter>
  );
}
