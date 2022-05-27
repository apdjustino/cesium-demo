/**
 * A data adapter for querying a sqlite database
 */

import { Material } from "../domain/material";
import { Material as MaterialType } from "../types/material";

export class SqliteAdapter {

  getAll(): MaterialType[] {
    return []
  }

  get(id: string): MaterialType {
    const material = new Material();
    const materialData = material.get_object(id);
    return materialData;

  }

  update(id: string, newMaterial: MaterialType): boolean {
    return true;
  }

  delete(id: string): boolean {
    return true;
  }

}