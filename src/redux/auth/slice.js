import { createSlice } from "@reduxjs/toolkit";

import { handlePending, handleRejected } from "../../utils/handleLoading.js";
import operations from "./operations.js";

const initialState = {
  user: { email: "", displayName: null, photoURL: null, uid: "" },
  theme: null,
  isLogged: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(operations.register.pending, handlePending)
      .addCase(operations.register.rejected, handleRejected)
      .addCase(operations.register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(operations.login.pending, handlePending)
      .addCase(operations.login.rejected, handleRejected)
      .addCase(operations.login.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(operations.loginSync, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(operations.logout.pending, handlePending)
      .addCase(operations.logout.rejected, handleRejected)
      .addCase(operations.logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(operations.logoutSync, (state) => {
        state.user = initialState.user;
        state.isLogged = false;
        state.theme = null;
      })
      .addCase(operations.updateName.pending, handlePending)
      .addCase(operations.updateName.rejected, handleRejected)
      .addCase(operations.updateName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.displayName = action.payload;
      })
      // .addCase(operations.getTheme.pending, handlePending)
      // .addCase(operations.getTheme.rejected, handleRejected)
      .addCase(operations.getTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(operations.updateTheme.pending, handlePending)
      .addCase(operations.updateTheme.rejected, handleRejected)
      .addCase(operations.updateTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
        state.isLoading = false;
        state.error = null;
      });
  },
});

const reducer = slice.reducer;

export default reducer;
