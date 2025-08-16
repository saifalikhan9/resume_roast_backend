import express from "express";
import cors from "cors";
import roastService from "../src/roastService.js";
import multer from "multer";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/generateRoast", upload.single("resume"), roastService);

// app.use(router);
// app.use((err, req, res, next) => {
//   console.error("❌ Global error:", err);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// ✅ Export for Vercel
export default app;

// ✅ Local dev support
if (process.env.NODE_ENV !== "production") {
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
}
