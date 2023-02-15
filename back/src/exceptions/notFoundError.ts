import { NextFunction, Request, Response } from 'express';
import { logger } from '../logging-file/logger';
import HttpStatusCode from '../utils/HttpCodes';

export default function notFoundError(
  _: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error(HttpStatusCode.NOT_FOUND);
  res.status(HttpStatusCode.NOT_FOUND).json({
    error: {
      code: HttpStatusCode.NOT_FOUND,
      message: `${HttpStatusCode.NOT_FOUND} Error: Resource not found!`,
    },
  });
}
