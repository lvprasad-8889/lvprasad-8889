import mongoose from "mongoose";

const uri: any = process.env.MONGO_URI;

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log("error in connecting to databse ", err);
  } else {
    console.log("connected to database successfully");
  }
});

const db = mongoose.connection;

export { db };
