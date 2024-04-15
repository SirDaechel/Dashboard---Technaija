import { configureStore } from "@reduxjs/toolkit";
import OverlayReducer from "./features/overlay/overlaySlice";
import MenuReducer from "./features/menu/menuSlice";

export const store = configureStore({
  reducer: {
    overlay: OverlayReducer,
    menu: MenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
