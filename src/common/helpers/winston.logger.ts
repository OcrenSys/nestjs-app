import { createLogger, transports, format } from 'winston';

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/logs.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}
