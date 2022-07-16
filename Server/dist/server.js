"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = require("./db/connect");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
connect_1.db.on("error", console.log.bind("MongoDB connection error"));
app.use("/", userRoutes_1.userRouter);
// handling invalid path
app.use((request, response, next) => {
    response.send({ message: `path ${request.url} is invalid` });
});
//error handling middleware
app.use((error, request, response, next) => {
    response.send({ message: "Error occurred", reason: `${error.message}` });
});
const port = process.env.PORT || "5000";
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});
