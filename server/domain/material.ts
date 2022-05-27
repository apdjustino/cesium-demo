import { logger } from "../logger/config";
import { Material as MaterialType } from "../types/material.js"
/**
 * This is a domain model for the Material entity
 * It is an abstraction of the business logic needed to use a Material object in our application
 */
export class Material {
  color: string;
  cost: number;
  deliverDate: string;
  name: string;
  volume: number;

  constructor(color: string = "#000000", cost: number = 0, deliverDate: string = "", name: string = "", volume: number = 0) {    
    this.color = color
    this.name = name;
    this.deliverDate = deliverDate;
    
    // cost and volume must be parsed into integers (cost in cents)
    try {
      const costInt = Math.floor(cost);
      this.cost = costInt;
    }
    catch (error) {
      logger.error(`There has been an error parsing "cost" ${error}`)
      throw new Error("Error parsing inputs")
    }

    try {
      const volumeInt = Math.floor(volume);
      this.volume = volumeInt;
    }
    catch (error) {
      logger.error(`There has been an error parsing "volume" ${error}`)
      throw new Error("Error parsing inputs")
    }
            
  }

  /**
   * calculates the total value of the material and returns a locale string in USD
   * @returns string
   */
  calculateTotalValue() {
    try {
      if (this.cost && this.volume) {
        const dollarCost = (this.cost / 100) * this.volume;
        return dollarCost.toLocaleString("en-US", { style: "currency", currency: "USD"});
      } 
    }
    catch (error) {
      logger.error(`Error calculating total value - ${error}`)      
    }
    
    return "";
  }

  get_object(id: string): MaterialType {
    const material: MaterialType = {
      id,
      cost: this.cost / 100,
      color: this.color,
      deliverDate: this.deliverDate,
      name: this.name,
      totalCost: this.calculateTotalValue(),
      volume: this.volume
    }

    return material;
  }

}