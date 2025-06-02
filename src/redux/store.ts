import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import exposureReducer from "./exposureSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    exposure: exposureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
