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
        totalCost: "$200.00"
      },
      {
        id: "c66f267a-9401-4e9b-a327-e27e4de30e0c",
        color: "#37a828",
        cost: 1000,
        deliverDate: "14-03-2022",
        name: "Gravel",
        volume: 4,
        totalCost: "$40.00"
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
  get(id: string): Material | {} {
    const material = this.materials.find((material) => material.id === id);
    return material || {};
  }

  /**
   * Simulates updating a Material in the db. returns true if successful, false if not
   * @param id 
   * @param newMaterial 
   * @returns {boolean}
   */
  update(id: string, newMaterial: Material): boolean {
    const index = this.materials.findIndex((material) => material.id === id);
    if (index) {
      this.materials = this.materials.splice(index, 1, newMaterial);      
    }

    return !!index;
  }

  /**
   * Simulates deleting a Material from the db. returns true if successful false if not
   * @param id 
   * @returns {boolean}
   */
  delete(id: string): boolean {
    const index = this.materials.findIndex((material) => material.id === id);
    if (index) {
      this.materials = this.materials.splice(index, 1);      
    }

    return !!index;
  }
}