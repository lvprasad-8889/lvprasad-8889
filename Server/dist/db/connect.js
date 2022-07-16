"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGO_URI;
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log("error in connecting to databse ", err);
    }
    else {
        console.log("connected to database successfully");
    }
});
const db = mongoose_1.default.connection;
exports.db = db;
