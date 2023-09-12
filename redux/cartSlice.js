import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    reset: () => {
      return [];
    },
    addItem: (state, action) => {
      return ["item"];
    },
  },
});

// export const {} = cartSlice.actions;

export const { reset, addItem } = cartSlice.actions;
export default cartSlice.reducer;
