import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/es/storage";

import breedReducer from "../features/breeds/breedSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  breedReducer
);

export const store = configureStore({
  reducer: {
    breeds: persistedReducer,
  },
});

export const persistor = persistStore(store);