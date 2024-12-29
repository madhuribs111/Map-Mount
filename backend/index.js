import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js"
import indexRouter from "./routes/index.route.js"; 

dotenv.config()

const PORT = process.env.PORT;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(
    {
        origin: ['https://map-mount-frontend.vercel.app'],
        methods: ["POST", "GET"],
     allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers

        credentials: true
    }
))
// app.use(
//     cors({
//       origin: ['http://localhost:3000'], // Allow your frontend origin
//       methods: ["GET", "POST", "PUT", "DELETE"], // Include all methods your app uses
//       allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
//       credentials: true, // Enable sending cookies
//     })
//   );
  
// listen to a server
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

//connect to the database
connectDB();

//main route:
app.use("/", (req,res)=>{
 res.send("Hello from the backend")
});
