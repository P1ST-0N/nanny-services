import { createSlice } from "@reduxjs/toolkit";

import { getNannies } from "./operations.js";
import { handlePending, handleRejected } from "../../utils/handleLoading.js";

const initialState = {
  nannies: [],
  lastId: "",
  isEnd: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNannies.pending, handlePending)
      .addCase(getNannies.rejected, handleRejected)
      .addCase(getNannies.fulfilled, (state, action) => {
        const { isEnd, nannies } = action.payload;
        state.isLoading = false;
        state.error = null;
        state.isEnd = isEnd;

        if (nannies.length > 0) {
          state.lastId = nannies[nannies.length - 1].id;
          state.nannies = [...state.nannies, ...nannies];
        }
      });
  },
});

const reducer = slice.reducer;

export default reducer;
