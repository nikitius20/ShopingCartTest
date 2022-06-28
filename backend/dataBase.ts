import mongoose from "mongoose";
require("dotenv").config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME } = process.env;
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err: unknown) => {
    console.log(err);
  });
