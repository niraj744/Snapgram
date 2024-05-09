import { genSalt, hash, compare } from "bcrypt";
import User from "../DB/Models/User.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import randomColor from "randomcolor";

const files = async (avatar, others) => {
  const color = randomColor({
    luminosity: "bright",
    format: "rgb",
  });
  let photo;
  if (!avatar) {
    photo = await axios.get(
      `https://ui-avatars.com/api/?background=${color}&color=fff&name=${others.username}+${others.lastname}`
    );
  }

  const isAvatar = avatar ? avatar[0].filename : photo.config.url;

  return { isAvatar };
};

const Signup = async (req, res) => {
  const avatar = req?.files?.avatar;

  const { password, ...others } = req.body;

  try {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    others.password = hashPassword;

    const file = await files(avatar, others);

    const user = await User.create({
      username: others.username,
      lastname: others.lastname,
      email: others.email,
      password: hashPassword,
      avatar: file.isAvatar,
    });

    res.status(200).json({ success: "account created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const ExistingUser = await User.findOne({ email: email });
    if (ExistingUser) {
      const comparePassword = await compare(password, ExistingUser.password);
      if (ExistingUser.email === email && comparePassword) {
        const token = jwt.sign(
          { UserID: ExistingUser._id },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
        res.cookie("token", token);
        const { password, ...others } = ExistingUser._doc;
        res
          .status(200)
          .json({ success: "loggedin successfully", user: others });
      } else {
        res.status(200).json({ message: "invalid creditiation" });
      }
    } else {
      res.status(401).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: "logout successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const getUser = await User.findById(id).select("-password");
    res.status(200).json({ user: getUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateprofilePost = async (req, res) => {
  const { id } = req.user;
  const { username, lastname, email } = req.body;

  try {
    const ExistingData = await User.findById(id);

    const newObj = {
      username,
      lastname,
      email,
      avatar: req?.file?.filename || ExistingData.avatar,
    };

    const NewUser = await User.findByIdAndUpdate(id, newObj, {
      new: true,
    }).select("-password");

    res.status(200).json({ success: true, NewUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const AddFriend = async (req, res) => {
  const { _id } = req.user;
  const { followingId } = req.params;

  try {
    const findfollower = await User.findById(_id);
    const findfollowing = await User.findById(followingId);

    if (_id == followingId) {
      res.status(400).json({ message: "You can't add yourself as a friend" });
    } else {
      if (
        findfollower.following.includes(followingId) &&
        findfollowing.followers.includes(_id)
      ) {
        findfollower.following = findfollower.following.filter((following) => {
          following !== _id;
        });
        findfollowing.followers = findfollowing.followers.filter(
          (followers) => {
            followers !== followingId;
          }
        );
      } else {
        findfollower.following.push(followingId);
        findfollowing.followers.push(_id);
      }

      res.status(200).json({ success: true });

      await findfollower.save();
      await findfollowing.save();
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { Signup, Login, Logout, updateProfile, updateprofilePost, AddFriend };
