import Post from "../DB/Models/Post.js";
import Comment from "../DB/Models/Comments.js";
import User from "../DB/Models/User.js";

const Create = async (req, res) => {
  const { _id } = req.user;
  const { filename } = req.file;
  const { caption, location, verified } = req.body;

  try {
    const create = await Post.create({
      user: _id,
      caption: caption,
      image: filename,
      location: location,
      tags: verified,
    });
    const updateUser = await User.findById(_id);
    updateUser.posts.push(create._id);
    updateUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetPost = async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: [req.user._id] } },
      "-password"
    );
    const post = await Post.find(null, null, {
      sort: {
        createdAt: -1,
      },
    }).populate([{ path: "user", select: "-password" }, { path: "comments" }]);
    res.status(200).json({ post, users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const singlePost = await Post.findById(id).populate([
      { path: "user", select: "-password" },
      { path: "comments", populate: { path: "user", select: "-password" } },
    ]);
    res.status(200).json({ singlePost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const GetSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById(id).populate([
      { path: "savePosts" },
      { path: "likes", populate: [{ path: "user", select: "-password" }] },
      { path: "followers" },
      { path: "following" },
      { path: "posts", populate: [{ path: "user", select: "-password" }] },
    ]);
    res.status(200).json({ singleUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const GetUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: [req.user._id] } }, null, {
      sort: {
        createdAt: -1,
      },
    }).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const Search = async (req, res) => {
  const { search } = req.body;
  try {
    const posts = await Post.find({
      caption: { $regex: search, $options: "i" },
    }).populate({ path: "user", select: "-password" });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const Like = async (req, res) => {
  const { postid, userid } = req.body;
  try {
    const Posts = await Post.findById(postid);
    const Users = await User.findById(userid);
    if (Posts.likespost.includes(userid) && Users.likes.includes(postid)) {
      const userIndex = Posts.likespost.indexOf(userid);
      const postIndex = Users.likes.indexOf(postid);
      if (userIndex !== -1 && postIndex !== -1) {
        Posts.likespost.splice(userIndex, 1);
        Users.likes.splice(postIndex, 1);
      }
    } else {
      Posts.likespost.push(userid);
      Users.likes.push(postid);
    }
    await Posts.save();
    await Users.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const Save = async (req, res) => {
  const { id } = req.params;

  try {
    const findUser = await User.findById(req.user._id);

    if (findUser.savePosts.includes(id)) {
      findUser.savePosts = findUser.savePosts.filter((ids) => {
        ids !== id;
      });
    } else {
      findUser.savePosts.push(id);
    }

    await findUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const GetSavesPost = async (req, res) => {
  try {
    const SavedPost = await User.findById(req.user._id)
      .select("savePosts")
      .populate([
        { path: "savePosts", populate: { path: "user", select: "-password" } },
      ]);
    res.status(200).json({ SavedPost });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const AddComment = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { comment } = req.body.data;

  try {
    const findPost = await Post.findById(id);

    const addComment = await Comment.create({
      user: _id,
      post: id,
      comment,
    });

    findPost.comments.push(addComment._id);

    await findPost.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export {
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
};
