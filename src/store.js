import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Redux/Actions/loaderSlice";
import AuthSlice from "./Redux/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    loader: loaderSlice,
  },
});
