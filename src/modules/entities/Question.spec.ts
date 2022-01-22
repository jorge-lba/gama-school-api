import { Question } from "./Question";

describe("Entity - Question", () => {
  it("should be create a new question", () => {
    const question = Question.create({ statement: "Question" });

    expect(question.id).toEqual(expect.any(String));
  });
});
