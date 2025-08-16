import { Router } from "express";
import { roasrService } from "./roastService.js";
const router = Router();

router.post("/generateRoast", roasrService);

export default router;
