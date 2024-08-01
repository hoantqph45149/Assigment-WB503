import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
