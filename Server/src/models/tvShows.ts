import mongoose from "mongoose";

// defining TvShow schema
export const TvShowsSchema = new mongoose.Schema({
  imgLink: { type: String, required: true },
  title: { type: String, required: true },
  streamingApp: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});
