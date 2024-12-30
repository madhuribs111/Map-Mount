import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js"
import indexRouter from "./routes/index.route.js"; 

dotenv.config()

const PORT = process.env.PORT;
const app = express()
app.options('*', cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// listen to a server
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

//connect to the database
connectDB();

//main route:
///app.use("/", indexRouter);
app.use("/api", cors({
  origin: 'https://map-mount-frontend.vercel.app',
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}),indexRouter);
