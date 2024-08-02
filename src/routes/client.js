import { Router } from "express";
import {
  addReview,
  listProduct,
  productDetail,
  searchProducts,
} from "../controllers/client.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const clientRouter = Router();

clientRouter.get("/search", searchProducts);
clientRouter.get("/", listProduct);
clientRouter.get("/:id", productDetail);
clientRouter.post("/:id/review", requireAuth, addReview);

export default clientRouter;
