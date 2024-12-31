import express from "express"
import {pinRoute }from "../routes/pin.route.js";
import {userRoute} from "../routes/user.route.js"
const indexRouter = express.Router()

indexRouter.use("/pins", pinRoute);
indexRouter.use("/user", userRoute)

export {indexRouter}