import { format, createLogger, transports } from 'winston';
const { combine, timestamp, label, prettyPrint, errors } = format;

export const logger = createLogger({
  level: 'debug',
  format: combine(
    errors({ stack: true }),
    label({ label: 'winston custom format' }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    prettyPrint(),
  ),
  transports: [new transports.Console()],
});
