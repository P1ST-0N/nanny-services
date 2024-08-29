import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import firebaseOperations from "../../firebase/operations";

const getAll = createAsyncThunk("favorites/getAll", async (_, thunkAPI) => {
  try {
    const { uid } = thunkAPI.getState().auth.user;

    const res = await firebaseOperations.getFavorites(uid);

    return res.error ? thunkAPI.rejectWithValue(res.error.message) : res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const addItem = createAsyncThunk("favorites/add", async (item, thunkAPI) => {
  try {
    const { uid } = thunkAPI.getState().auth.user;

    const res = await firebaseOperations.addFavorite(uid, item);

    return res.error ? thunkAPI.rejectWithValue(res.error.message) : res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const deleteItem = createAsyncThunk(
  "favorites/delete",
  async (id, thunkAPI) => {
    try {
      const { uid } = thunkAPI.getState().auth.user;

      const res = await firebaseOperations.deleteFavorite(uid, id);

      return res.error ? thunkAPI.rejectWithValue(res.error.message) : res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const clearSync = createAction("favorites/clearSync");

export default {
  getAll,
  addItem,
  deleteItem,
  clearSync,
};
