import { createAsyncThunk } from "@reduxjs/toolkit";

import { getDBData } from "../../firebase/operations";

const PAGE_LIMIT = 3;

export const getNannies = createAsyncThunk(
  "services/getNannies",
  async (_, thunkAPI) => {
    try {
      const { lastId } = thunkAPI.getState().services;
      const limit = lastId ? PAGE_LIMIT + 1 : PAGE_LIMIT;

      const res = await getDBData(limit, lastId);
      if (res.error) {
        return thunkAPI.rejectWithValue(res.error.message);
      }

      const data = { isEnd: false, nannies: [...res.data] };

      if (data.nannies.length !== limit) {
        data.isEnd = true;
      }
      if (limit !== PAGE_LIMIT) {
        data.nannies.shift();
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
