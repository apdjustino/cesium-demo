"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetMaterials = void 0;
const config_js_1 = require("../logger/config.js");
const index_js_1 = require("../repositories/index.js");
/**
 * Request handler for GET /materials. Handles request for retrieving materials resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
const handleGetMaterials = (request, response) => {
    try {
        const materials = index_js_1.materialsRepository.getMaterials();
        response.json(materials);
    }
    catch (error) {
        config_js_1.logger.error(error);
        response.status(500).json({ message: "There has been an error" });
    }
};
exports.handleGetMaterials = handleGetMaterials;
