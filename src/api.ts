// src/api.ts
import serverless from "serverless-http";
import mongoose from "mongoose";
import app from "./app";

const MONGO_URI = process.env.MONGODB_URI || "";
let cached = (global as any).__mongoConnected;

async function ensureDb() {
  if (!MONGO_URI) {
    // For assignment demo we intentionally skip DB if not provided.
    return;
  }
  if (cached) return;
  try {
    await mongoose.connect(MONGO_URI);
    cached = true;
    (global as any).__mongoConnected = true;
    console.log("MongoDB connected (serverless)");
  } catch (err) {
    // Don't crash the function; log error and continue — prevents Vercel runtime failure in assignment demo
    console.error("MongoDB connection error (serverless):", err);
  }
}

// Wrap the app so we ensure DB (only if provided) before serving the request.
// serverless-http will create the proper handler that Vercel expects.
const handler = serverless(app);

export default async function (req: any, res: any) {
  await ensureDb();
  return handler(req, res);
}
