import express from "express"
import pinRoute from "../routes/pin.route.js";
import userRoute from "../routes/user.route.js"
const app = express()

app.use("/pins", pinRoute);
app.use("/user", userRoute)

export default app