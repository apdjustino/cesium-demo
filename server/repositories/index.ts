import { MaterialsRepository } from "./materialsRepo.js";
import { inMemoryTestAdapter } from "../adapters/index.js";

export const materialsRepository = new MaterialsRepository(inMemoryTestAdapter)

