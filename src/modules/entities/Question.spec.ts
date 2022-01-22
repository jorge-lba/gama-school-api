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

  it("should add alternatives in a question", () => {
    const question = Question.create({ statement: "Question 2" });

    question.includeIncorrectAlternatives(["Alternative 1", "Alternative 2"]);

    const [firstAlternative, secondAlternative] = question.alternatives;
    expect(question.alternatives.length).toEqual(2);
    expect(secondAlternative.equals(firstAlternative)).toBeFalsy();
    expect(firstAlternative.text).toEqual("Alternative 1");
    expect(secondAlternative.text).toEqual("Alternative 2");
  });
});
