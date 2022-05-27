import { logger } from "../logger/config";
import { Material as MaterialType } from "../types/material.js"
/**
 * This is a domain model for the Material entity
 * It is an abstraction of the business logic needed to use a Material object in our application
 */
export class Material {
  color?: string;
  cost?: number;
  deliverDate?: string;
  name?: string;
  volume?: number;

  constructor(color: string | undefined = undefined, cost: number | undefined = undefined, deliverDate: string | undefined = undefined, name: string | undefined = undefined, volume: number | undefined = undefined) {    
    this.color = color
    this.name = name;
    this.deliverDate = deliverDate;
    
    // check if type is number, if not try casting to float
    if (typeof cost !== "number") {
      try {
        this.cost = parseFloat(cost as any) || undefined;
      }
      catch (error) {
        logger.error(`Error parsing cost ${error}`);
        throw new Error("Error parsing cost")
      }
    } else {
      this.cost = cost;
    }
    
    if (typeof volume !== "number") {      
      try {        
        this.volume = parseFloat(volume as any) || undefined;       
      }
      catch (error) {
        logger.error(`Error parsing volume ${error}`);
        throw new Error("Error parsing volume")
      }
    } else {      
      this.volume = volume;
    }

    
  }

  /**
   * calculates the total value of the material and returns a locale string in USD
   * @returns string
   */
  calculateTotalValue() {
    try {
      if (this.cost && this.volume) {
        const dollarCost = this.cost * this.volume;
        return dollarCost.toLocaleString("en-US", { style: "currency", currency: "USD"});
      } 
    }
    catch (error) {
      logger.error(`Error calculating total value - ${error}`)      
    }
    
    return "";
  }

  get_object(id: string): MaterialType {
    if (!id) {
      throw new Error("Id is required for building material data object");
    }

    const material: MaterialType = {
      id: `${id}`,
      cost: this.cost,
      color: this.color,
      deliverDate: this.deliverDate,
      name: this.name,
      totalCost: this.calculateTotalValue(),
      volume: this.volume
    }

    return material;
  }

}