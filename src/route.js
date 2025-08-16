import { Router } from "express";
import { roasrService } from "./roastService.js";
import multer from "multer";
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/generateRoast", upload.single("resume"), roasrService);

export default router;
