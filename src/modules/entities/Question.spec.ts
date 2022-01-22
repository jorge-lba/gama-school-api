import { Question } from "./Question";

describe("Entity - Question", () => {
  it("should be create a new question", () => {
    const question = Question.create({ statement: "Question" });

    expect(question.id).toEqual(expect.any(String));
  });

  it("should be create a new question and contain a statement", () => {
    const question = Question.create({ statement: "Question" });

    expect(question.statement).toEqual("Question");
  });

  it("should add incorrect alternatives in a question", () => {
    const question = Question.create({ statement: "Question 2" });

    question.includeIncorrectAlternatives(["Alternative 1", "Alternative 2"]);

    const [first, second] = question.alternatives;
    expect(question.alternatives.length).toEqual(2);
    expect(second.alternative.equals(first.alternative)).toBeFalsy();
    expect(first.alternative.text).toEqual("Alternative 1");
    expect(first.isCorrect).toBeFalsy();
    expect(second.alternative.text).toEqual("Alternative 2");
    expect(second.isCorrect).toBeFalsy();
  });
});
