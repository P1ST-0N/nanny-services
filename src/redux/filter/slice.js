import { createSlice } from "@reduxjs/toolkit";

import operations from "./operations.js";

const initialState = {
  value: "all",
};

const slice = createSlice({
  name: "filter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(operations.set, (state, action) => {
      state.value = action.payload;
    });
  },
});

const reducer = slice.reducer;

export default reducer;
