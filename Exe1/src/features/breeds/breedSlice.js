import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBreeds } from "./breedService";

export const fetchBreeds = createAsyncThunk(
  "breeds/fetchBreeds",
  async (_, thunkAPI) => {
    try {
      return await getAllBreeds();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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

      .addCase(fetchBreeds.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds = action.payload.data;
      })

      .addCase(fetchBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default breedSlice.reducer;
