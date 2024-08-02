import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  upload,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getOneProduct);
productRouter.post("/", checkPermission, upload.single("image"), createProduct);
productRouter.post(
  "/:id",
  checkPermission,
  upload.single("image"),
  updateProduct
);
productRouter.get("/delete/:id", checkPermission, deleteProduct);
export default productRouter;
