import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const { SECRET_KEY } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const decode = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(400).json({
        message: "Không tìm thấy người dùng",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
