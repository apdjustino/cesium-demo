/**
 * A repository for fetching materials data
 */

import { Adapter } from "../types/adapters";
import { logger } from "../logger/config";
import { Material } from "../types/material";

export class MaterialsRepository {
  adapter: Adapter

  constructor(dataAdapter: Adapter) {
    this.adapter = dataAdapter;
  }

  /**
   * Gets a list of all materials
   */
  getMaterials(): Material[] {
    logger.info("Fetching all materials");    
    let materials: Material[] = [];
    try {
      materials = this.adapter.getAll()
    } 
    catch (error) {
      logger.error(`Error fetching all materials - ${error}`);
      throw new Error("Error in getMaterials() function");
    }

    return materials;
  }

  getMaterial(id: string): Material | {} {
    logger.info(`Fetching material with id ${id}`);
    try {
      const material: Material | {} = this.adapter.get(id);
      return material;    
    }
    catch (error) {
      logger.error(`There has been an error fetching material with id ${id} - ${error}`);
      return {};
    }
  }

  updateMaterial(id: string, newMaterial: Material): boolean {
    logger.info(`Updating material with id: ${id} with new object ${newMaterial}`);
    let success = false;
    try {
      success = this.adapter.update(id, newMaterial);
      return success;
    }
    catch (error) {
      logger.error(`There has been an error updating material with id ${id} - ${error}`);
      return false;
    }
  }

  deleteMaterial(id: string): boolean {
    logger.info(`Deleting material with id ${id}`)
    let success = false;
    try {
      success = this.adapter.delete(id);
      logger.info(`Successfully deleted material with id ${id}`);
      return success;
    }
    catch (error) {
      logger.error(`There has been an error deleting material with id ${id}`);
      return false;
    }
  }

  addMaterial(newMaterial: Material): boolean {
    logger.info(`Adding new material with data: ${newMaterial}`)
    let success = false;
    try {
      success = this.adapter.add(newMaterial);
      logger.info(`Successfully added new material with id ${newMaterial.id}`);
      return success;
    }
    catch (error) {
      logger.error(`There has been an error adding new material with id ${newMaterial.id} and data ${newMaterial}`);
      return false;
    }
  }


}