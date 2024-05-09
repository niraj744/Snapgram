import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import cors from "cors";
import Connection from "./DB/Connection.js";
import route from "./Routes/UserRoutes.js";
import postroute from "./Routes/PostRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(express.static(join(__dirname, "Public/avatar")));
app.use(express.static(join(__dirname, "Public/image")));

app.use("/auth", route);
app.use("/deshboard", postroute);

const connectionString = process.env.MONGO_CONNECTION;
Connection(connectionString);

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log(`Server listenting on port : http://localhost:${port}`);
});
