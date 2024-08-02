import { Router } from "express";
import {
  formLogin,
  formRegister,
  logout,
  signIn,
  signUp,
} from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/validBodyReq.js";
import { signInValidation, signUpValidation } from "../validations/user.js";

const authRouter = Router();

authRouter.get("/formlogin", formLogin);
authRouter.get("/formregister", formRegister);
authRouter.get("/logout", logout);
authRouter.post("/login", validBodyRequest(signInValidation), signIn);
authRouter.post("/register", validBodyRequest(signUpValidation), signUp);

export default authRouter;
