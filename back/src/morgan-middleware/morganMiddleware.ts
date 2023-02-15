import correlator from 'express-correlation-id';
import morgan from 'morgan';
import { logger } from '../logging-file/logger';

export const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res) as any),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(
        tokens['response-time'](req, res) as any,
      ),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.http(`Request`, data);
        logger.info(correlator.getId());
      },
    },
  },
);
