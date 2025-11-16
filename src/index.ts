// import express, { Application } from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// import errorHandler = require('./middlewares/errorHandler');
// import bookRoutes from './routes/bookRoutes';
// import borrowRoutes from './routes/borrowRoutes';
// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json()); // Parse JSON bodies
// app.use(errorHandler.errorHandler);

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit if connection fails
//   }
// };

// connectDB();

// // Routes
// app.use('/api/books', bookRoutes);
// app.use('/api/borrow', borrowRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));










import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import { errorHandler } from "./middlewares/errorHandler";
 
dotenv.config();
 
const app: Application = express();
const PORT = process.env.PORT || 3000;
 
// Middleware
app.use(express.json());
 
// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
 
// Default route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("✅ Server is running!");
});
 
// Error handler (after routes)
app.use(errorHandler);
 
// MongoDB connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
 
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
 
connectDB();