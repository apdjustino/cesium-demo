import { Request, RequestHandler, Response } from "express";
import { logger } from "../logger/config.js";
import { materialsRepository } from "../repositories/index.js";

/**
 * Request handler for GET /materials. Handles request for retrieving materials resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleGetMaterials: RequestHandler = (request: Request, response: Response) => {    
  try {
    const materials = materialsRepository.getMaterials();
    response.json(materials)
  }
  catch (error) {
    logger.error(error);
    response.status(500).json({message: "There has been an error"});
  }
  
}