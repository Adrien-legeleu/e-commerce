import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import appRouter from "./src/routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "mettre les fichier dans product model");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const products = [
  {
    img: "",
  },
];

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
app.use(express.static(path.join(__dirname, "fichier des image")));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("", appRouter);

app.post("/", upload.array("upload_file"), (req, res) => {
  const newProduct = {
    img: "fichier ou iol y a les image" + req.file?.filename,
  };
  products.push(newProduct);
});
app.listen(PORT, () => {
  console.log(
    `Server connected on port ${PORT} => url : http://localhost:${PORT}`
  );
});
