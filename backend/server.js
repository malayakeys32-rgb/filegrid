import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));
// ... other routes

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
