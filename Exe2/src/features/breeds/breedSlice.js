import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const API_URL =
  "https://dogapi.dog/api/v2/breeds";

export const fetchBreeds =
  createAsyncThunk(
    "breeds/fetchBreeds",
    async (_, thunkAPI) => {
      try {
        const response =
          await axios.get(API_URL);

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          "Unable to connect to API"
        );
      }
    }
  );

const initialState = {
  breeds: [],
  loading: false,
  error: null,
};

const breedSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchBreeds.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchBreeds.fulfilled,
        (state, action) => {
          state.loading = false;
          state.breeds =
            action.payload.data;
          state.error = null;
        }
      )

      .addCase(
        fetchBreeds.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default breedSlice.reducer;