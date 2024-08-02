import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import { generrateToken } from "../utils/jwtToken.js";
import { hasshPassword } from "../utils/password.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const signUp = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        message: "Email đã được đăng ký",
      });
    }
    const hashedPassword = hasshPassword(req.body.password);
    if (!hashedPassword) {
      return res.status(400).json({
        message: "Mã hóa mật khẩu thất bại",
      });
    }
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({
        message: "Không thể đăng ký",
      });
    }
    res.redirect("/api/auth/formlogin");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Email này chưa được đăng ký",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }
    const accessToken = generrateToken({ _id: user._id });
    if (!accessToken) {
      return res.status(400).json({
        message: "Không thể tạo token",
      });
    }

    user.password = undefined;

    // Lưu token vào cookie
    res.cookie("token", accessToken, {
      httpOnly: true, // Bảo vệ chống lại XSS
      secure: process.env.NODE_ENV === "production", // Chỉ dùng secure cookie trong môi trường production
      maxAge: 60 * 60 * 1000, // Thời hạn token là 1 giờ
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      data: {
        user,
      },
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/api/auth/formlogin");
};

export const formLogin = async (req, res, next) => {
  res.render("login");
};
export const formRegister = async (req, res, next) => {
  res.render("register");
};
