import { Request, Response } from "express";
import UserShows from "../models/userShows";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// get tv shows of a user
export let allShows = async (request: Request, response: Response) => {
  let username = request.params.username;
  let shows = await UserShows.findOne({ username });
  // if there is no user then returning appropiate message
  if (shows === null) {
    response.send({
      message: "failed to fecth shows",
      payload: [],
    });
  } else {
    response.send({
      message: "fecthed shows",
      payload: shows.TvShows,
    });
  }
};

// just adding a user with his tv shows as there is no signup page
export let addUser = async (request: Request, response: Response) => {
  let result = await UserShows.findOne({
    username: request.body.username,
  });
  // if there is no user then we can insert a user
  // and hashing the password for security reasons
  if (result === null) {
    let hashLength = Number(process.env.HASHLENGTH);
    let hashedPassword = await bcryptjs.hash(request.body.password, hashLength);
    let userObject = request.body;
    userObject.password = hashedPassword;
    let createUser = await UserShows.insertMany(userObject);
    response.send({ message: "user created successfully" });
  } else {
    response.send({
      message: "user already exists",
    });
  }
};

// api for user to login
export let checkUser = async (request: Request, response: Response) => {
  let userCredObj = request.body;
  let userOfDB = await UserShows.findOne({
    username: userCredObj.username,
  });
  // if username does not exist then sending invalid user
  if (userOfDB === null) {
    response.send({ message: "Invalid user" });
  } else {
    let userExists = await bcryptjs.compare(
      userCredObj.password,
      userOfDB.password
    );
    // if password wrong then sending response invalid password
    if (!userExists) {
      response.send({ message: "Invalid password" });
    } else {
      // if success using jwt token to know that user is real
      let userToken: any = process.env.SECRET_KEY;
      let tokenLife = process.env.TOKEN_LIFE;
      let token = jwt.sign({ username: userOfDB.username }, userToken, {
        expiresIn: tokenLife,
      });
      response.send({
        message: "login success",
        payload: token,
        userObj: userOfDB,
      });
    }
  }
};

// add a tv show
export let addTvShow = async (request: Request, response: Response) => {
  let username = request.body.username;
  let tvShowDetails = request.body.tvShowDetails;
  // converting show title to lowers case so that if user is adding another
  // tvshow then we can alert user
  // adding tv show based on username and the details need to be added
  tvShowDetails.title = tvShowDetails.title.toLowerCase();
  let addTvShow = await UserShows.updateOne(
    { username },
    { $push: { TvShows: tvShowDetails } }
  );
  let shows = await UserShows.findOne({ username });
  if (addTvShow.modifiedCount === 1) {
    response.send({
      message: "tvshow added successfully",
      payload: shows?.TvShows,
    });
  } else {
    response.send({
      message: "failed to add show",
    });
  }
};

//update a tvshow
export let updateTvShow = async (request: Request, response: Response) => {
  let username = request.body.username;
  let tvShowDetails = request.body.tvShowDetails;
  // updating tvshow based on username and tvshow id to update the details
  tvShowDetails.title = tvShowDetails.title.toLowerCase();
  let updateTvShowOfUser = await UserShows.updateOne(
    { username, "TvShows._id": tvShowDetails._id },
    {
      $set: {
        "TvShows.$.title": tvShowDetails.title,
        "TvShows.$.imgLink": tvShowDetails.imgLink,
        "TvShows.$.streamingApp": tvShowDetails.streamingApp,
        "TvShows.$.rating": tvShowDetails.rating,
        "TvShows.$.review": tvShowDetails.review,
      },
    }
  );
  let shows = await UserShows.findOne({ username });
  if (updateTvShowOfUser.matchedCount === 1) {
    response.send({ message: "updated successfully", payload: shows?.TvShows });
  } else {
    response.send({
      message: "updating show failed",
    });
  }
};

// delete a tvshow
export let deleteTvShow = async (request: Request, response: Response) => {
  let username = request.body.username;
  let tvShowDetails = request.body.tvShowDetails;
  // deleting tvshow based on username and tvshow id to update the details
  let deleteTvShow = await UserShows.updateOne(
    { username },
    { $pull: { TvShows: { _id: tvShowDetails._id } } }
  );
  let shows = await UserShows.findOne({ username });
  if (deleteTvShow.modifiedCount === 1) {
    response.send({ message: "deleted successfully", payload: shows?.TvShows });
  } else {
    response.send({
      message: "deleting a tvshow failed",
    });
  }
};
