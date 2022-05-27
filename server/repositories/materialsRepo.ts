/**
 * A repository for fetching materials data
 */

import { Adapter } from "../types/adapters";
import { logger } from "../logger/config";
import { Material } from "../types/material";
import { Material as MaterialClass } from "../domain/material";
import { MaterialResponse } from "../types/response";

export class MaterialsRepository {
  adapter: Adapter

  constructor(dataAdapter: Adapter) {
    this.adapter = dataAdapter;
  }

  /**
   * Gets a list of all materials
   */
  getMaterials(): MaterialResponse<Material[]> {
    logger.info("Fetching all materials");    
    const response: MaterialResponse<Material[]> = {
      success: false,
    }

    try {
      const materials = this.adapter.getAll()
      response.data = materials;
      response.success = true;
    } 
    catch (error) {
      const message = `Error fetching all materials - ${error}`
      logger.error(message);
      response.message = message;
    } finally {
      return response;
    }

    
  }

  getMaterial(id: string): MaterialResponse<Material> {
    logger.info(`Fetching material with id ${id}`);
    const response: MaterialResponse<Material> = {
      success: false
    }
    try {
      const material = this.adapter.get(id);
      if (!!material) {
        response.success = true;
        response.data = material; 
      } else {
        response.success = false;
        response.message = `Could not find data with id ${id}`;
      }
      
    }
    catch (error) {
      const message = `There has been an error fetching material with id ${id} - ${error}`
      logger.error(message);
      response.message = message;
      
    } 
    finally {
      return response;
    }
  }

  updateMaterial(id: string, color: string | undefined, cost: number | undefined, deliverDate: string | undefined, name: string | undefined, volume: number | undefined): MaterialResponse<boolean> {
    logger.info(`Updating material with id: ${id}`);
    const response: MaterialResponse<boolean> = {
      success: false
    };

    try {
      const materialObj = new MaterialClass(color, cost, deliverDate, name, volume);      
      const material = materialObj.get_object(id);
      const success = this.adapter.update(id, material);
      response.success = success;
    }
    catch (error) {
      const message = `There has been an error updating material with id ${id} - ${error}`
      logger.error(message);
      response.message = message;
    }
    finally {
      return response;
    }
  }

  deleteMaterial(id: string): MaterialResponse<boolean> {
    logger.info(`Deleting material with id ${id}`)
    const response: MaterialResponse<boolean> = {
      success: false
    }

    try {
      const success = this.adapter.delete(id);
      if (success) {
        logger.info(`Successfully deleted material with id ${id}`);
      }
      response.success = success;      
    }
    catch (error) {
      const message = `There has been an error deleting material with id ${id}`
      logger.error(message);
      response.message = message      
    }
    finally {
      return response;
    }
  }

  addMaterial(id: string, color: string | undefined, cost: number | undefined, deliverDate: string | undefined, name: string | undefined, volume: number | undefined): MaterialResponse<boolean> {
    logger.info(`Adding new material with id ${id}`)
    const response: MaterialResponse<boolean> = {
      success: false
    };

    
    try {
      const materialObj = new MaterialClass(color, cost, deliverDate, name, volume);
      const material = materialObj.get_object(id);
      const success = this.adapter.add(material);
      if (success) {
        logger.info(`Successfully added new material with id ${id}`);
      }
      response.success = success;
      
    }
    catch (error) {
      const message = `There has been an error adding new material with id ${id}`
      logger.error(message);
      response.message = message
    }
    finally {
      return response
    }
  }


}