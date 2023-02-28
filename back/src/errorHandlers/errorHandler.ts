import { Request, Response, NextFunction } from 'express';
import { logger } from 'logger';

export default function errorHandler(
  err: any,
  _: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error(`Error: ${JSON.stringify(err)}`);

  const errCode = err.status || err.code || 500;
  let errorMsg = '';

  if (err.errorObj) {
    errorMsg = err.errorObj
      ? err.errorObj.message + ' ' + (err.errorObj.detail || '')
      : err.message;
  }

  res.status(errCode).json({
    success: false,
    code: errCode,
    message: errorMsg,
  });
}
