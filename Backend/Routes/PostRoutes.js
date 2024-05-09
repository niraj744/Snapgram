import express from "express";
import Middleware from "../Middleware/Middleware.js";
import {
  Create,
  GetPost,
  GetSinglePost,
  GetSingleUser,
  GetUsers,
  Search,
  Like,
  Save,
  GetSavesPost,
  AddComment,
} from "../Controller/PostController.js";
import Upload from "../multer.js";

const postroute = express.Router();

postroute.post("/post", Middleware, Upload.single("image"), Create);

postroute.get("/get-post", Middleware, GetPost);

postroute.get("/get-single-post/:id", Middleware, GetSinglePost);

postroute.get("/get-single-user/:id", Middleware, GetSingleUser);

postroute.get("/get-users", Middleware, GetUsers);

postroute.post("/search", Middleware, Search);

postroute.post("/like", Middleware, Like);

postroute.post("/save/:id", Middleware, Save);

postroute.get("/getSavesPost", Middleware, GetSavesPost);

postroute.post("/add-comment/:id", Middleware, AddComment);

export default postroute;
