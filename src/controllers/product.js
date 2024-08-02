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
    res.status(200).json({
      message: "Get all product successfully",
      data: products,
    });
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
    res.status(200).json({
      message: "Get product successfully",
      data: product,
    });
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
    res.status(200).json({
      message: "Create product successfully",
      data: product,
    });
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
    res.status(200).json({
      message: "Update product successfully",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json({
      message: "Delete product successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
