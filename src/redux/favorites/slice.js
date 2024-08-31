import { createSlice } from "@reduxjs/toolkit";

import operations from "./operations";
import { handlePending, handleRejected } from "../../utils/handleLoading";

const initialState = {
  nannies: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "favorites",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(operations.getAll.pending, handlePending)
      .addCase(operations.getAll.rejected, handleRejected)
      .addCase(operations.getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.nannies = action.payload;
      })
      .addCase(operations.addItem.pending, handlePending)
      .addCase(operations.addItem.rejected, handleRejected)
      .addCase(operations.addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.nannies.push(action.payload);
      })
      .addCase(operations.deleteItem.pending, handlePending)
      .addCase(operations.deleteItem.rejected, handleRejected)
      .addCase(operations.deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.nannies = state.nannies.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(operations.clearSync, (state) => {
        state.nannies = initialState.nannies;
      });
  },
});

const reducer = slice.reducer;

export default reducer;
