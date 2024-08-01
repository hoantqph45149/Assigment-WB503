import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const generrateToken = (payload, expiresIn = "1d") => {
  dotenv.config();
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
