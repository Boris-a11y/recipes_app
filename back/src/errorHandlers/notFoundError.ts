import { NextFunction, Request, Response } from 'express';
import HttpStatusCode from '@httpCodes/HttpCodes';
import { logger } from 'logger';

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
