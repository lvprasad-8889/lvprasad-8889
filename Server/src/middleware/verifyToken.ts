import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// middleware used to verify user everytime requests
export let verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let bearerToken = request.headers.authorization;

  // if there is no token exist then user cannot be given access
  // to do any operations to his data in database
  if (bearerToken === undefined) {
    return response.send({ message: "Unauthorized request" });
  }

  let token = bearerToken.split(" ")[1];
  if (token === "null") {
    return response.send({ message: "Unauthorized request" });
  }
  try {
    // used to verify token by jwt.verify method
    let userToken: any = process.env.SECRET_KEY;
    jwt.verify(token, userToken);
    next();
  } catch (err) {
    return response.send({ message: "Session expired..Relogin to continue" });
  }
};
