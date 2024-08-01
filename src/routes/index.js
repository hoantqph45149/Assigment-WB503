import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import routeRender from "./renders.js";

const router = Router();
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/", routeRender);

export default router;
