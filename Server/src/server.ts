import express, { Application, Request, Response, NextFunction } from "express";
import { userRouter } from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors";
import {db} from './db/connect';

const app: Application = express();

dotenv.config();

app.use(cors());

app.use(express.json());

db.on("error",console.log.bind("MongoDB connection error"))

app.use("/", userRouter);

// handling invalid path
app.use((request: Request, response: Response, next: NextFunction) => {
  response.send({ message: `path ${request.url} is invalid` });
});

//error handling middleware
app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    response.send({ message: "Error occurred", reason: `${error.message}` });
  }
);

const port: string = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
