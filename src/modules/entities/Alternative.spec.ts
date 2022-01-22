import { Alternative } from "./Alternative";

describe("Entity - Alternative", () => {
  it("should be create a new alternative", () => {
    const alternative = Alternative.create({ text: "Alternative" });

    expect(alternative.id).toEqual(expect.any(String));
  });

  it("should be create a new alternative and contain a text", () => {
    const alternative = Alternative.create({ text: "Alternative" });

    expect(alternative.text).toEqual("Alternative");
  });
});
