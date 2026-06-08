import { configureStore } from "@reduxjs/toolkit";
import breedReducer from "../features/breeds/breedSlice";

export const store = configureStore({
  reducer: {
    breeds: breedReducer,
  },
});
