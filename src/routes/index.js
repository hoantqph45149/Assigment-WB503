import { Router } from "express";
import authRouter from "./auth.js";
import clientRouter from "./client.js";
import productRouter from "./product.js";

const router = Router();
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/client", clientRouter);

export default router;
