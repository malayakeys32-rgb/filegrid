import express from "express";
import dotenv from "dotenv";
dotenv.
config();

const app = express();

// Middleware
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.json({ message: "Sentinel-Black backend is running" });
});

// Render requires this:
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

