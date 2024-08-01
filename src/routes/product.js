import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  renderCreateProductForm,
  renderUpdateProductForm,
  updateProduct,
  upload,
} from "../controllers/product.js";

const productRouter = Router();

// productRouter.get("/create", renderCreateProductForm);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getOneProduct);
productRouter.post("/", upload.single("image"), createProduct);
// productRouter.get("/update/:id", renderUpdateProductForm);
productRouter.post("/:id", upload.single("image"), updateProduct);
productRouter.get("/delete/:id", deleteProduct);
export default productRouter;
