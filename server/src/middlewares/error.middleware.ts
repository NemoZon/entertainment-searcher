/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiError from '@utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';

export default function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction // important to have all four parameters
) {
  let status = 500;
  let message = 'Unexpected error';
  let errors: (Error | ValidationError)[] = [];

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    errors = err.errors;
  }

  res.status(status).json({
    message,
    errors
  });
}