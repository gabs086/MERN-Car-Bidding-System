import winston from 'winston';
const { combine, timestamp, json } = winston.format;
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/filelog-%DATE%-info.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/filelog-%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
  ],
});

type LogType = 'info' | 'error';

const loggerHelper = (logType: LogType, obj: any) => {
  if (logType === 'info') {
    logger.info(obj);
  } else if (logType === 'error') {
    logger.error(obj);
  }
};
export default loggerHelper;
