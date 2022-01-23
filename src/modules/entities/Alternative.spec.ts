import { Alternative } from "./Alternative";

describe("Entity - Alternative", () => {
  it("should be create a new alternative", () => {
    const alternative = Alternative.create("Alternative");

    expect(alternative.value).toEqual("Alternative");
  });

  it("should compare two alternatives", () => {
    const firstAlternative = Alternative.create("Alternative");
    const secondAlternative = Alternative.create("Alternative");

    expect(firstAlternative.equals(secondAlternative)).toBeTruthy();
  });
});
