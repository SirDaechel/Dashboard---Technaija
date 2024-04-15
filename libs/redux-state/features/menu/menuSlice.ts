import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  openMobileMenu: false,
};

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpenMobileMenu: (state, action) => {
      state.openMobileMenu = action.payload;
    },
  },
});

export const menuState = (state: RootState) => state.menu;
export const { setOpenMobileMenu } = menu.actions;
export default menu.reducer;
