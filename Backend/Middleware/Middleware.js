import jwt from "jsonwebtoken";
import User from "../DB/Models/User.js";

const Middleware = async (req, res, next) => {
  const cookie = req?.cookies?.token;
  if (cookie) {
    try {
      const { UserID } = jwt.verify(cookie, process.env.SECRET_KEY);
      const user = await User.findById(UserID);
      req.user = user;
      next();
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  } else {
    res.status(404).json({ message: "cookie not found" });
  }
};

export default Middleware;
