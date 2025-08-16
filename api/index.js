import express from "express";
import cors from "cors";

import router from "../src/route.js";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
});

app.use(router);
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Export for Vercel
export default app;

// ✅ Local dev support
if (process.env.NODE_ENV !== "production") {
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
}
