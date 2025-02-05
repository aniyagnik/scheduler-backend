import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT
const SECRET = process.env.SECRET;

dotenv.config({
  path: "../.env",
});

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  console.log("handling request : ", req.url + " with method " + req.method);
  next();
});

import { taskRouter, userRouter } from "./routes/index.js";

app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URL)
  .then((result) => console.log("connected to Mongodb"))
  .catch((err) => console.error("error in connecting to mongodb, ", err));

export default app;