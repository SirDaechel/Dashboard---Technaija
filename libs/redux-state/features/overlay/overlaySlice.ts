import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  overlay: false,
};

export const overlay = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      state.overlay = action.payload;
    },
  },
});

export const overlayState = (state: RootState) => state.overlay;
export const { setOverlay } = overlay.actions;
export default overlay.reducer;
