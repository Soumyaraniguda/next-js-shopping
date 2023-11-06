import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expand: true,
};

export const adminSideNavExpandSlice = createSlice({
  name: "adminSideNavExpand",
  initialState,
  reducers: {
    toggleSideNav(state, action) {
      state.expand = !state.expand;
    },
  },
});

export const { toggleSideNav } = adminSideNavExpandSlice.actions;

export default adminSideNavExpandSlice.reducer;
