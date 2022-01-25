import { Alternative } from "./Alternative";

describe("Entity - Alternative", () => {
  it("should be create a new alternative", () => {
    const alternative = Alternative.create("Alternative", true);

    expect(alternative.value.text).toEqual("Alternative");
  });

  it("should compare two alternatives", () => {
    const firstAlternative = Alternative.create("Alternative", true);
    const secondAlternative = Alternative.create("Alternative", false);

    expect(firstAlternative.equals(secondAlternative)).toBeTruthy();
  });
});
