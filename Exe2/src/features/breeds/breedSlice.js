import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const API_URL =
  "https://dogapi.dog/api/v2/breeds";
const CACHE_KEY = "breeds_cache";

export const fetchBreeds =
  createAsyncThunk(
    "breeds/fetchBreeds",
    async (_, thunkAPI) => {
      try {
        const response =
          await axios.get(API_URL);

        const payload = {
          breeds: response.data.data,
          offline: false,
        };
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify(payload)
        );

        return payload;
      } catch {
        const cached = localStorage.getItem(
          CACHE_KEY
        );

        if (cached) {
          return {
            breeds: JSON.parse(cached).breeds,
            offline: true,
          };
        }

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
  offline: false,
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
          state.error = null;
          state.offline = false;
        }
      )

      .addCase(
        fetchBreeds.fulfilled,
        (state, action) => {
          state.loading = false;
          state.breeds =
            action.payload.breeds || [];
          state.offline =
            action.payload.offline ?? false;
          state.error = null;
        }
      )

      .addCase(
        fetchBreeds.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.offline = false;
        }
      );
  },
});

export default breedSlice.reducer;

