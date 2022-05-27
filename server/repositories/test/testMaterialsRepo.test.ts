import { MaterialsRepository } from "../materialsRepo";
import { InMemoryTestAdapter } from "../../adapters/inMemoryTestAdapter";

const setup = () => {
  const inMemoryTestAdapter = new InMemoryTestAdapter();
  const materialsRepository = new MaterialsRepository(inMemoryTestAdapter);

  return materialsRepository;
}

describe("Test suite for the materialsRepo repository", () => {
  test("Tests getMaterials function", () => {
    const materialsRepository = setup();

    const materials = materialsRepository.getMaterials();
    expect(materials.success).toBe(true);
    expect(materials.data).toStrictEqual([
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
    ]);
  });

  test("Tests getMaterial with valid id", () => {
    const materialsRepository = setup();

    const material = materialsRepository.getMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436");
    expect(material.success).toBe(true);
    expect(material.data).toStrictEqual({
      id: "63a4c1a5-716c-48af-b2c7-f674d9eda436",
        color: "#fcba03",
        cost: 5000,
        deliverDate: "14-03-2022",
        name: "Sand",
        volume: 4,
        totalCost: "$20000.00"
    })
  })

  test("Tests getMaterial with invalid id", () => {
    const materialsRepository = setup();
    const material = materialsRepository.getMaterial("invalidId");

    expect(material.success).toBe(false);
    expect(material.message).toBe("Could not find data with id invalidId");
    expect(material.data).toBe(undefined);
  });


  test("Tests update material color with valid id", () => {
    const materialsRepository = setup();
    const material = materialsRepository.updateMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436", "red", undefined, undefined, undefined, undefined);

    expect(material.success).toBe(true);
    
    const verify = materialsRepository.getMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436");
    
    expect((verify as any).data.color).toBe("red");
  });

  test("Tests update material volume with valid id", () => {
    const materialsRepository = setup();
    const material = materialsRepository.updateMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436", undefined, undefined, undefined, undefined, 10);

    expect(material.success).toBe(true);
    
    const verify = materialsRepository.getMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436");
    
    expect((verify as any).data.volume).toBe(10);
  });

  test("Tests update material volume with bad data", () => {
    const materialsRepository = setup();
    const material = materialsRepository.updateMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436", undefined, undefined, undefined, undefined, "abcdef" as any);

    expect(material.success).toBe(true);
    
    const verify = materialsRepository.getMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436");
    
    expect((verify as any).data.volume).toBe(4);
  });

  test("Delete material with valid id", () => {
    const materialsRepository = setup();
    const material = materialsRepository.deleteMaterial("63a4c1a5-716c-48af-b2c7-f674d9eda436");

    expect(material.success).toBe(true);
    
    const materialsRemaining = materialsRepository.getMaterials();
    expect((materialsRemaining.data as any).length).toBe(1);
  })

  test("Delete material with invalid id", () => {
    const materialsRepository = setup();
    const material = materialsRepository.deleteMaterial("invalidId");

    expect(material.success).toBe(false);
    
    const materialsRemaining = materialsRepository.getMaterials();
    expect((materialsRemaining.data as any).length).toBe(2);
  });

  test("Add material with a valid id", () => {
    const materialsRepository = setup();

    const material = materialsRepository.addMaterial("newId", undefined, undefined, undefined, undefined, undefined);
    expect(material.success).toBe(true);

    const materialsRemaining = materialsRepository.getMaterials();
    expect((materialsRemaining.data as any).length).toBe(3);

    const newMaterial = materialsRepository.getMaterial("newId");
    expect(newMaterial.success).toBe(true);
    expect(newMaterial.data).toStrictEqual({id: "newId", totalCost: "", cost: undefined, color: undefined, deliverDate: undefined, name: undefined, volume: undefined})
  });

  test("Add material with a valid id and name", () => {
    const materialsRepository = setup();

    const material = materialsRepository.addMaterial("newId", undefined, undefined, undefined, "aggregate", undefined);
    expect(material.success).toBe(true);

    const materialsRemaining = materialsRepository.getMaterials();
    expect((materialsRemaining.data as any).length).toBe(3);

    const newMaterial = materialsRepository.getMaterial("newId");
    expect(newMaterial.success).toBe(true);
    expect(newMaterial.data).toStrictEqual({id: "newId", totalCost: "", cost: undefined, color: undefined, deliverDate: undefined, name: "aggregate", volume: undefined})
  });

  test("Add material with no id", () => {
    const materialsRepository = setup();

    const material = materialsRepository.addMaterial(undefined as any, undefined, undefined, undefined, undefined, undefined);
    expect(material.success).toBe(false)
  })
})