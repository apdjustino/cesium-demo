/**
 * An in memory data adapter that simulates database operations
 */

import { Material } from "../types/material";

export class InMemoryTestAdapter {
  materials: Material[];

  constructor() {    
    this.materials = [
      {
        id: "63a4c1a5-716c-48af-b2c7-f674d9eda436",
        color: "#fcba03",
        cost: 5000,
        deliverDate: "14-03-2022",
        name: "Sand",
        volume: 4,
        totalCost: "$20000.00"
      },
      {
        id: "c66f267a-9401-4e9b-a327-e27e4de30e0c",
        color: "#37a828",
        cost: 1000,
        deliverDate: "14-03-2022",
        name: "Gravel",
        volume: 4,
        totalCost: "$4000.00"
      }
    ]
  }

  /**
   * Simulates getting all the materials stored in the db
   * @returns {Material[]}
   */
  getAll(): Material[] {
    return this.materials;
  }

  /**
   * Simulates getting a material by id in the database
   * @param id 
   * @returns {Material} 
   */
  get(id: string): Material | undefined {
    const material = this.materials.find((material) => material.id === id);
    return material;
  }

  /**
   * Simulates updating a Material in the db. returns true if successful, false if not
   * @param id 
   * @param newMaterial 
   * @returns {boolean}
   */
  update(id: string, newMaterial: Material): boolean {    
    const index = this.materials.findIndex((material) => material.id === id);        
    if (index >= 0) {
      const itemToReplace: Material = {...this.materials[index]};
      if (newMaterial.color) itemToReplace.color = newMaterial.color;
      if (newMaterial.name) itemToReplace.name = newMaterial.name;
      // have to explcitly compare this to undefined because 0 is falsey
      if (newMaterial.cost !== undefined) itemToReplace.cost = newMaterial.cost;
      if (newMaterial.volume !== undefined) itemToReplace.volume = newMaterial.volume;
      if (newMaterial.deliverDate) itemToReplace.deliverDate = newMaterial.deliverDate;

      this.materials.splice(index, 1, itemToReplace);      
    }

    return index >= 0;
  }

  /**
   * Simulates deleting a Material from the db. returns true if successful false if not
   * @param id 
   * @returns {boolean}
   */
  delete(id: string): boolean {
    const index = this.materials.findIndex((material) => material.id === id);
    if (index >= 0) {
      this.materials.splice(index, 1);      
    }

    return index >= 0;
  }

  /**
   * Simulates adding a new material
   * @param {Material} newMaterial 
   * @returns {boolean}
   */
  add(newMaterial: Material): boolean {
    // first check if id exists in "table"
    const material = this.materials.find((m) => m.id === newMaterial.id);
    if (!material) {
      this.materials.push(newMaterial);
      return true;
    }

    return false;
    
    
  }
}