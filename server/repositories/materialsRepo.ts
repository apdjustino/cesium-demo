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


}