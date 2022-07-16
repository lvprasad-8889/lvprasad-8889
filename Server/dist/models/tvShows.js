"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvShowsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// defining TvShow schema
exports.TvShowsSchema = new mongoose_1.default.Schema({
    imgLink: { type: String, required: true },
    title: { type: String, required: true },
    streamingApp: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
});
