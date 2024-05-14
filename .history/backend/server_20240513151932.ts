import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import appRouter from "./src/routes/index";

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

app.use("", appRouter);

app.listen(PORT, () => {
  console.log(
    `Server connected on port ${PORT} => url : http://localhost:${PORT}`
  );
});
