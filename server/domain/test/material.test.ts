import { Material } from "../material";

describe("Unit test suite for testing domain model methods", () => {
  test("Tests calculateTotalValue with valid inputs", () => {
    const material = new Material(undefined, 30, undefined, undefined, 2);
    const totalValue = material.calculateTotalValue();

    expect(totalValue).toBe("$60.00");
  });

  test("Tests calculateTotalValue with bad cost input", () => {
    const material = new Material(undefined, {} as any, undefined, undefined, 2);
    const totalValue = material.calculateTotalValue();

    expect(totalValue).toBe("");
  })
})