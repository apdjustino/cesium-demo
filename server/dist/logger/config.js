import { createLogger, format, transports } from "winston";
export const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.timestamp(), format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    }))
});
export const logRequest = (request, response, next) => {
    logger.info(`Received request to url: ${request.url}`);
    next();
};
export const logError = (error, request, response, next) => {
    logger.error(`Express server occurred at url: ${request.url} with error ${error}`);
};
