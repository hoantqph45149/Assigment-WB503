import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwtToken.js";
dotenv.config();

const { SECRET_KEY } = process.env;

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/api/auth/formlogin");
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.redirect("/api/auth/formlogin");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send("Có lỗi xảy ra, vui lòng thử lại");
  }
};
