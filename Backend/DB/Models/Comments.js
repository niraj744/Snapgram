import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
