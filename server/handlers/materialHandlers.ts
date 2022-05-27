import { Request, RequestHandler, Response } from "express";
import { Material } from "../domain/material.js";
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

/**
 * Request handler for GET /material/:id. Handles request for retrieving a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleGetMaterial: RequestHandler = (request: Request, response: Response) => {
  const { id } = request.params;
  logger.info(`Received request to to get material with id ${id}`);

  if (!!id) {
    try {
      const material = materialsRepository.getMaterial(id);
      logger.info(`Successfully fetched material with id ${id}`)
      response.json(material);
    }
    catch (error) {
      logger.error(error)
      response.status(500).json({message: "There has been an error"});
    }
  } else {
    logger.error(`Reqest to get material id was not successful because id was not parsed by request handler`)
    response.json({});
  }

}

/**
 * Request handler for PUT /material/:id. Handles request for updating a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleUpdateMaterial: RequestHandler = (request: Request, response: Response) => {
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
  
      const materialObj = new Material(color, cost, deliverDate, name, volume);
      const material = materialObj.get_object(id);
      
      const success = materialsRepository.updateMaterial(id, material);
      
      if (success) {
        logger.info(`Succesfully updated material with id ${id}`);
        response.json({success: true});
      } else {
        logger.error(`Request to update material with id ${id} was not successful`);
        response.status(500).json({message: "There has been an error"})
      }
    } else {
      logger.warning(`Attempt to update material failed because no id was sent to server`)
      response.json({success: false});
    }
  }
  catch (error) {
    logger.error(`Request to update material with id ${id} was not successful - ${error}`)    
    response.status(500).json({message: "There has been an error"})
  }   
}

/**
 * Request handler for DELETE /material/:id. Handles request for deleting a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
export const handleDeleteMaterial: RequestHandler = (request: Request, response: Response) => {
  const { id } = request.params;
  logger.info(`Received request to delete material with id ${id}`);

  try {
    const success = materialsRepository.deleteMaterial(id);

    if (success) {
      logger.info(`Successfully deleted material with id ${id}`);
      response.json({success: true})
    } else {
      logger.error(`Request to delete material with id ${id} failed`);
      response.status(500).json({message: "There has been an error"});
    }
  } catch (error) {
    logger.error(`Request to delete material with id ${id} failed`);
    response.status(500).json({message: "There has been an error"});
  }
}

/**
 * Request handler for POST /material/:id. Handles request for updating a material resource
 * @param {Request} request request object passed in from express server
 * @param {Response} response response object passed in from express server
 */
 export const handleAddMaterial: RequestHandler = (request: Request, response: Response) => {  
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

    const materialObj = new Material(color, cost, deliverDate, name, volume);
    const material = materialObj.get_object(id);
    const success = materialsRepository.addMaterial(material);

    if (success) {
      logger.info(`Succesfully added material with id ${id}`);
      response.json({success: true});
    } else {
      logger.error(`Request to add material with id ${id} was not successful`);
      response.status(500).json({message: "There has been an error"})
    }
  }
  catch (error) {
    logger.error(`Request to add material was not successful - ${error}`)    
    response.status(500).json({message: "There has been an error"})
  }   
}