import { createSlice } from "@reduxjs/toolkit";

// interface for knowing which type of each object in a TvShow
export interface TvShowInterface {
  imgLink: string;
  _id: string;
  title: string;
  rating: number;
  review: string;
  streamingApp: string;
}

const initialState = { TvShows: [], loggedIn: false, inProcess: false };

// created reducers to update, add, delete the data in the store
const TvShowsSlice = createSlice({
  name: "UserTvShows",
  initialState,
  reducers: {
    getTvShows(state: any, action) {
      state.TvShows = [...action.payload.data];
      state.loggedIn = action.payload.loggedIn;
    },
    addTvShow(state: any, action) {
      state.TvShows = [...state.TvShows, action.payload];
    },
    updateTvShows(state: any, action) {
      state.TvShows = [...action.payload.data];
    },
    setLoggedIn(state: any, action) {
      state.loggedIn = action.payload.loggedIn;
    },
    setProcess(state: any, action) {
      state.inProcess = action.payload.inProcess;
    },
  },
});

export const TvShowsActions = TvShowsSlice.actions;

export default TvShowsSlice;
