import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import appRouter from "./src/routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const uri = process.env.URI_MONGODB || "";
const PORT = 5080;
if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => console.log(err));
} else {
  console.log("No URI to DB");
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Enlever le slash final
  })
);

app.use("", appRouter);

app.listen(PORT, () => {
  console.log(
    `Server connected on port ${PORT} => url : http://localhost:${PORT}`
  );
});
