import { Router } from "express";
import { roasrService } from "./roastService.js";
const router = Router();
router.get("/", (req, res) => {
  res.send("working");
});
router.post("/generateRoast", roasrService);

export default router;
