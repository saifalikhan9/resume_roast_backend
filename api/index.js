import express from "express";
import cors from "cors";
import roastService from "../src/roastService.js";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { configDotenv } from "dotenv";
import {checkCredits} from '../src/creaditsCheck-middleware.js'

const app = express();
configDotenv();

console.log("Frontend URL:", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 10,
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(apiLimiter);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/generateRoast",checkCredits, upload.single("resume"), roastService);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
}
