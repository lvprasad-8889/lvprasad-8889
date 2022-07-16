"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tvShows_1 = require("./tvShows");
const dotenv_1 = __importDefault(require("dotenv"));
// using to variables from the env file for security reasons
dotenv_1.default.config();
// defining user schema
exports.userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    emailId: { type: String, required: true },
    TvShows: [tvShows_1.TvShowsSchema],
});
// creating model with existing schema
const UserShows = mongoose_1.default.model("UserShows", exports.userSchema);
exports.default = UserShows;
