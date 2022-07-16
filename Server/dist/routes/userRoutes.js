"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const verifyToken_1 = require("../middleware/verifyToken");
const UserShows = __importStar(require("../controllers/userShowsController"));
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
// routes are defined and every time user request token need to be verified
// then user allowed to do any operations to the his data in databse
userRouter.get("/shows/:username", verifyToken_1.verifyToken, UserShows.allShows);
userRouter.post("/addUser", UserShows.addUser);
userRouter.post("/login", UserShows.checkUser);
userRouter.put("/addShow", verifyToken_1.verifyToken, UserShows.addTvShow);
userRouter.put("/updateShow", verifyToken_1.verifyToken, UserShows.updateTvShow);
userRouter.delete("/deleteShow", verifyToken_1.verifyToken, UserShows.deleteTvShow);
