import express from "express"
import {login,register} from "../controllers/user.controller.js";

const userRoute = express.Router()

userRoute.post("/create", register );
userRoute.post("/login", login)

export default userRoute