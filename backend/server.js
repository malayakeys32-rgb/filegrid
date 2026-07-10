import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Test route so Render shows "Healthy"
app.get("/", (req, res) => {
  res.json({ message: "FileGrid backend running" });
});

// Render requires this:
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
