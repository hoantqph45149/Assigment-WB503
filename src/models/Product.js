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
    reviews: [
      {
        rating: Number,
        comment: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
