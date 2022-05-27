"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logRequest = exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    }))
});
const logRequest = (request, response, next) => {
    exports.logger.info(`Received request to url: ${request.url}`);
    next();
};
exports.logRequest = logRequest;
const logError = (error, request, response, next) => {
    exports.logger.error(`Express server occurred at url: ${request.url} with error ${error}`);
};
exports.logError = logError;
