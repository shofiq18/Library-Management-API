import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import errorHandler = require('./middlewares/errorHandler');
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(errorHandler.errorHandler);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  }
};

connectDB();

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));