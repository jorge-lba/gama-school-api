import { Test } from "./Test";

describe("Entity - Test", () => {
  it("should be create a new test", () => {
    const test = Test.create({ title: "test" });

    expect(test.id).toEqual(expect.any(String));
  });
});
