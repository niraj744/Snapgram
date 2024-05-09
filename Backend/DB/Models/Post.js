import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, required: true, min: 10 },
    image: { type: String, required: true },
    location: { type: String, required: true },
    tags: { type: String },
    likespost: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
