import { Router } from "express";
import {
  formLogin,
  formRegister,
  logout,
  signIn,
  signUp,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/formlogin", formLogin);
authRouter.get("/formregister", formRegister);
authRouter.get("/logout", logout);
authRouter.post("/login", signIn);
authRouter.post("/register", signUp);

export default authRouter;
