





import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// CRITICAL: CORS must come FIRST — before any route or body parser!
app.use(cors({
  origin: ['http://localhost:3001', 'https://library-frontend-gules.vercel.app'],
  credentials: true,
}));

// Now these can come after
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);  // ← I also noticed this might be wrong!

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running! CORS is fixed!");
});

// Error handler (last)
app.use(errorHandler);

// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();