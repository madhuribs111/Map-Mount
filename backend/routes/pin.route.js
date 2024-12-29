import express from "express"
import {createPin, getPins} from "../controllers/pin.controller.js";
const router = express.Router()

router.post("/create", createPin );
router.get("/get", getPins)
export default router