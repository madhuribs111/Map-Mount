import express from "express"
import {createPin, getPins} from "../controllers/pin.controller.js";
const pinRoute = express.Router()

pinRoute.post("/create", createPin );
pinRoute.get("/get", getPins)
export  {pinRoute}