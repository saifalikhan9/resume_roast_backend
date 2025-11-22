import express from "express";
import cors from "cors";
import roastService from "../src/roastService.js";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { configDotenv } from "dotenv";
import { checkCredits } from "../src/creaditsCheck-middleware.js";
import redis from "../src/redis.js";


const app = express();
configDotenv();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL| "http://localhost:3000",
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

app.post("/generateRoast", checkCredits, upload.single("resume"), roastService);
app.get("/getCredits", async (req, res) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    console.log(forwarded);

    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress;

    console.log("Client IP:", ip);
    if (!ip && !forwarded) {
      return res.status(404).json({ error: "Ip not found" });
    }
    const credits = await redis.get(ip);
    return res.status(200).json({ credits });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

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
