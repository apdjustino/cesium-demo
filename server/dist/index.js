"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const materialHandlers_js_1 = require("./handlers/materialHandlers.js");
const config_js_1 = require("./logger/config.js");
const app = (0, express_1.default)();
// hard code port - in a larger app or production environemnt would use environment variables
const port = 3001;
// use JSON middleware to allow for JSON requests and responses
app.use(express_1.default.json());
// use winston logger middleware
app.use(config_js_1.logRequest);
app.use(config_js_1.logError);
// Routes 
app.get("/materials", materialHandlers_js_1.handleGetMaterials);
app.listen(port, () => {
    console.log(`Server is running at https://localhost:3001`);
});
