import { Router } from "express";
import { roastService } from "./roastService.js";
import multer from "multer";
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/generateRoast", upload.single("resume"), roastService);

export default router;
