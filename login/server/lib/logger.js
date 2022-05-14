import { createLogger, format, transports } from "winston";
/**
 * 
 */
const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'login-service' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
    colored: true,
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

export default logger;