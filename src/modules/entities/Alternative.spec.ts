import { Alternative } from "./Alternative";

describe("Entity - Alternative", () => {
  it("should be create a new alternative", () => {
    const alternative = Alternative.create({ text: "Alternative" });

    expect(alternative.id).toEqual(expect.any(String));
  });
});
