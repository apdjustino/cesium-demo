import { Request, RequestHandler, Response } from "express";
import { logger } from "../logger/config.js";
import { materialsRepository } from "../repositories/index.js";
import { MaterialResponse } from "../types/response.js";
import { Material as MaterialType } from "../types/material";

/**
 * Request handler for GET /materials. Handles request for retrieving materials resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleGetMaterials: RequestHandler = (request: Request, response: Response) => {    
  let materials: MaterialResponse<MaterialType[]> = { success: false };
  try {
    materials = materialsRepository.getMaterials();
    response.json(materials)
  }
  catch (error) {
    logger.error(error);
    response.status(500).json(materials);
  }
  
}

/**
 * Request handler for GET /material/:id. Handles request for retrieving a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleGetMaterial: RequestHandler = (request: Request, response: Response) => {
  let material: MaterialResponse<MaterialType> = { success: false };
  const { id } = request.params;
  logger.info(`Received request to to get material with id ${id}`);

  if (!!id) {
    try {
      material = materialsRepository.getMaterial(id);
      logger.info(`Successfully fetched material with id ${id}`)
      response.json(material);
    }
    catch (error) {
      logger.error(error)
      response.status(500).json(material);
    }
  } else {
    logger.error(`Reqest to get material id was not successful because id was not parsed by request handler`)
    response.json(material);
  }

}

/**
 * Request handler for PUT /material/:id. Handles request for updating a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleUpdateMaterial: RequestHandler = (request: Request, response: Response) => {
  let updateResponse: MaterialResponse<boolean> = { success: false };
  const { id } = request.params;
  logger.info(`Received request to update material with id ${id}`);

  try {
    if (!!id) {
      const {
        color,
        cost,
        deliverDate,
        name,
        volume
      } = request.body;      
      
      updateResponse = materialsRepository.updateMaterial(id, color, cost, deliverDate, name, volume);
      
      if (updateResponse.success) {
        logger.info(`Succesfully updated material with id ${id}`);
        response.json(updateResponse);
      } else {
        logger.error(`Request to update material with id ${id} was not successful`);
        response.status(500).json(updateResponse)
      }
    } else {
      logger.warning(`Attempt to update material failed because no id was sent to server`)
      response.json(updateResponse);
    }
  }
  catch (error) {
    logger.error(`Request to update material with id ${id} was not successful - ${error}`)    
    response.status(500).json(updateResponse);
  }   
}

/**
 * Request handler for DELETE /material/:id. Handles request for deleting a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleDeleteMaterial: RequestHandler = (request: Request, response: Response) => {
  let deleteResponse: MaterialResponse<boolean> = { success: false };
  const { id } = request.params;
  logger.info(`Received request to delete material with id ${id}`);

  try {
    deleteResponse = materialsRepository.deleteMaterial(id);

    if (deleteResponse.success) {
      logger.info(`Successfully deleted material with id ${id}`);
      response.json(deleteResponse)
    } else {
      logger.error(`Request to delete material with id ${id} failed`);
      response.status(500).json(deleteResponse);
    }
  } catch (error) {
    logger.error(`Request to delete material with id ${id} failed`);
    response.status(500).json(deleteResponse);
  }
}

/**
 * Request handler for POST /material/:id. Handles request for updating a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
 export const handleAddMaterial: RequestHandler = (request: Request, response: Response) => {  
  let addResponse: MaterialResponse<boolean> = { success: false };
  try {
    logger.info("Adding new material")
    const {
      id,
      color,
      cost,
      deliverDate,
      name,
      volume
    } = request.body;

    
    addResponse = materialsRepository.addMaterial(id, color, cost, deliverDate, name, volume);

    if (addResponse.success) {
      logger.info(`Succesfully added material with id ${id}`);
      response.json(addResponse);
    } else {
      logger.error(`Request to add material with id ${id} was not successful`);
      response.status(500).json(addResponse)
    }
  }
  catch (error) {
    logger.error(`Request to add material was not successful - ${error}`)    
    response.status(500).json(addResponse)
  }   
}