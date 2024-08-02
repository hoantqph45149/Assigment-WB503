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
import { validBodyRequest } from "../middlewares/validBodyReq.js";
import { productValidation } from "../validations/product.js";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getOneProduct);
productRouter.post(
  "/",
  checkPermission,
  upload.single("image"),
  validBodyRequest(productValidation),
  createProduct
);
productRouter.patch(
  "/:id",
  checkPermission,
  upload.single("image"),
  validBodyRequest(productValidation),
  updateProduct
);
productRouter.delete("/:id", checkPermission, deleteProduct);
export default productRouter;
