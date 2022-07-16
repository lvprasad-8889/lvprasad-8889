import { verifyToken } from "../middleware/verifyToken";
import * as UserShows from "../controllers/userShowsController";
import express from "express";

const userRouter = express.Router();

// routes are defined and every time user request token need to be verified
// then user allowed to do any operations to the his data in databse

userRouter.get("/shows/:username", verifyToken, UserShows.allShows);

userRouter.post("/addUser", UserShows.addUser);

userRouter.post("/login", UserShows.checkUser);

userRouter.put("/addShow", verifyToken, UserShows.addTvShow);

userRouter.put("/updateShow", verifyToken, UserShows.updateTvShow);

userRouter.delete("/deleteShow", verifyToken, UserShows.deleteTvShow);

export { userRouter };
