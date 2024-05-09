import express from "express";
import {
  Signup,
  Login,
  Logout,
  updateprofilePost,
  updateProfile,
  AddFriend,
} from "../Controller/UserController.js";
import Upload from "../multer.js";
import Middleware from "../Middleware/Middleware.js";

const route = express.Router();

route.post(
  "/Sign-up",
  Upload.fields([{ name: "avatar", maxCount: 1 }]),
  Signup
);

route.post("/Log-in", Login);

route.post("/Log-out", Logout);

route.get("/updateprofile", Middleware, updateProfile);

route.patch(
  "/update_profile",
  Upload.single("avatar"),
  Middleware,
  updateprofilePost
);

route.post("/addFriend/:followingId", Middleware, AddFriend);

export default route;
