import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, min: 3 },
    lastname: { type: String, required: true, min: 5 },
    email: { type: String, required: true, min: 5, unique: true },
    password: { type: String, required: true, min: 5 },
    avatar: { type: String },
    savePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
