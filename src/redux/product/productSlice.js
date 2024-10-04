import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  categories: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },

    addToProduct: (state, action) => {
      state.categories.push({ ...action.payload });
    },
  },
});

export const { toggleState, addToProduct } = productSlice.actions;

export default productSlice.reducer;
