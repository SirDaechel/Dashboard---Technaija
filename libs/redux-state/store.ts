import { configureStore } from "@reduxjs/toolkit";
import OverlayReducer from "./features/overlay/overlaySlice";

export const store = configureStore({
  reducer: {
    overlay: OverlayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
