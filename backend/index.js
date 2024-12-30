import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import indexRouter from "./routes/index.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const app = express();

// Middleware
app.use(cors({
  origin: 'https://map-mount-frontend.vercel.app', // Adjust origin to match your frontend
  methods: ["POST", "GET", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Main route
app.use("/api", indexRouter);

// Local development: Uncomment for testing locally
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// Export for serverless environments
export default app;
