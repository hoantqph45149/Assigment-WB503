import Product from "../models/Product.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/upload/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage: storage });
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({ error: "No product found" });
    }
    res.render("productList", { products: products });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("productDetail", { product: product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file.filename;
  try {
    const product = await Product.create({
      title: title,
      price: price,
      description: description,
      image: image,
    });
    res.redirect("/api/product");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;
    const updateData = { title, price, description };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.redirect("/api/product");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.redirect("/api/product");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const renderCreateProductForm = (req, res) => {
  return res.render("createProduct");
};
export const renderUpdateProductForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("updateProduct", { product: product });
};
