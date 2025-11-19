// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

// CORS first
app.use(cors({
  origin: ['http://localhost:3001', 'https://library-frontend-gules.vercel.app'],
  credentials: true,
}));

app.use(express.json());

// Routes (same as you had)
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running! CORS is fixed!");
});

// Error handler (last)
app.use(errorHandler);

export default app;
