import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Mongoose validation errors already have the shape we need
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: err,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    success: false,
    error: err.message || err,
  });
};