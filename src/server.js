import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

// Tạo __dirname tương đương trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const PORT = process.env.PORT || 3000;
const URL_DB = process.env.URL_DB;

// Connect to MongoDB
mongoose
  .connect(URL_DB)
  .then(() => {
    console.log("Connect to MongoDB successfully");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "upload")));

// Routes
app.use("/api", router);

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
