import express from "express";
import mongoose from "mongoose";
import issuesRoute from "./routes/issuesRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("HELLO");
});

app.use("/issues", issuesRoute);

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
