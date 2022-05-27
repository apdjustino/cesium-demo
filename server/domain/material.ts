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
    this.cost = cost;
    this.volume = volume;
    // cost and volume must be parsed into integers
    // try {
    //   if (cost) {
    //     const costInt = Math.floor(cost * 100);
    //     this.cost = costInt;
    //   } else {
    //     this.cost = cost;
    //   }
      
    // }
    // catch (error) {
    //   logger.error(`There has been an error parsing "cost" ${error}`)
    //   throw new Error("Error parsing inputs")
    // }

    // try {
    //   if (volume) {
    //     const volumeInt = Math.floor(volume);
    //     this.volume = volumeInt;
    //   } else {
    //     this.volume = volume;
    //   }
      
    // }
    // catch (error) {
    //   logger.error(`There has been an error parsing "volume" ${error}`)
    //   throw new Error("Error parsing inputs")
    // }
            
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
    const material: MaterialType = {
      id,
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