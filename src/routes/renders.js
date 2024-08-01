import { Router } from "express";
import {
  renderCreateProductForm,
  renderUpdateProductForm,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const routeRender = Router();

routeRender.get(
  "/product-update/:id",
  checkPermission,
  renderUpdateProductForm
);
routeRender.get("/product-create", checkPermission, renderCreateProductForm);

export default routeRender;
