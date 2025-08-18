import express from "express";
import cors from "cors";
import roastService from "../src/roastService.js";
import multer from "multer";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();

app.use(cors({
  origin : process.env.FRONTEND_URL,
  methods: ['GET','POST']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(apiLimiter)
app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/generateRoast", upload.single("resume"), roastService);


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
