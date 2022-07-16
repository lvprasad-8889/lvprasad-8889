import mongoose from "mongoose";
import { TvShowsSchema } from "./tvShows";
import dotenv from "dotenv";

// using to variables from the env file for security reasons
dotenv.config();

// defining user schema
export const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  emailId: { type: String, required: true },
  TvShows: [TvShowsSchema],
});

// creating model with existing schema
const UserShows = mongoose.model("UserShows", userSchema);

export default UserShows;
