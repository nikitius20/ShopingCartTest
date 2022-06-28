import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import cors from "cors";
import "./dataBase";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
