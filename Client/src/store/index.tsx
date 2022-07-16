import { configureStore } from "@reduxjs/toolkit";
import TvShowsSlice from "./slices";

const store = configureStore({
  reducer: TvShowsSlice.reducer,
});

export default store;
