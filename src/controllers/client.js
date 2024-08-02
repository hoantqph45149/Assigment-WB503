import Product from "../models/Product.js";
export const listProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({ error: "No product found" });
    }
    res.render("Home", { products: products });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const productDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user"
    );
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("productDetail", { product: product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const products = await Product.find({ title: new RegExp(q, "i") });

    res.render("resultSearch", { products: products });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const { rating, comment } = req.body;
    const existingReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).send("<h2>Bạn đã đánh giá sản phẩm này</h2>");
    }
    product.reviews.push({ rating, comment, user: req.user._id });
    await product.save();

    res.redirect(`/api/client/${product._id}`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
