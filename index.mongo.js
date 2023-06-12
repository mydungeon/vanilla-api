import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import profileRouter from "./routes/profile.js";

const app = express();
const whitelist = ['http://localhost:3000']
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));
app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/profile", profileRouter); // http://localhost:5000/users/signup

const MONGODB_URL = "mongodb+srv://jonnyd:cxFVw0vRt4cdMi4V@cluster0.dlhgppq.mongodb.net?retryWrites=true&w=majority";
const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));