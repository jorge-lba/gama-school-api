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
    expect(first.alternative.value).toEqual("Alternative 1");
    expect(first.isCorrect).toBeFalsy();
    expect(second.alternative.value).toEqual("Alternative 2");
    expect(second.isCorrect).toBeFalsy();
  });

  it("should add correct alternatives in a question", () => {
    const question = Question.create({ statement: "Question 2" });

    question.includeCorrectAlternatives([
      "Alternative Correct 1",
      "Alternative Correct 2",
    ]);

    const [first, second] = question.alternatives;
    expect(question.alternatives.length).toEqual(2);
    expect(second.alternative.equals(first.alternative)).toBeFalsy();
    expect(first.alternative.value).toEqual("Alternative Correct 1");
    expect(first.isCorrect).toBeTruthy();
    expect(second.alternative.value).toEqual("Alternative Correct 2");
    expect(second.isCorrect).toBeTruthy();
  });

  it("should be remove alternative", () => {
    const question = Question.create({
      statement: "Question Remove Alternative",
    });
    question.includeCorrectAlternatives([
      "Alternative Correct 1",
      "Alternative Correct 2",
    ]);
    question.includeIncorrectAlternatives([
      "Alternative Incorrect 1",
      "Alternative Incorrect 2",
    ]);
    const alternatives = question.alternatives;

    question.removeAlternative(alternatives[0].alternative);

    expect(question.alternatives.length).toEqual(3);
  });

  it("should be possible to add equal alternatives", () => {
    const question = Question.create({
      statement: "Question Remove Alternative",
    });
    question.includeCorrectAlternatives(["Alternative Correct 1"]);
    const failAdd = () =>
      question.includeIncorrectAlternatives([
        "Alternative Correct 1",
        "Alternative Incorrect 1",
        "Alternative Incorrect 2",
      ]);

    expect(failAdd).toThrow(
      'Alternative "Alternative Correct 1" already exists'
    );
  });

  it("should count how many correct alternatives there are", () => {
    const question = Question.create({
      statement: "Question Remove Alternative",
    });
    question.includeCorrectAlternatives([
      "Alternative Correct 1",
      "Alternative Correct 2",
    ]);
    question.includeIncorrectAlternatives([
      "Alternative Incorrect 1",
      "Alternative Incorrect 2",
    ]);

    expect(question.countCorrectAlternatives()).toEqual(2);
  });

  it("should count how many incorrect alternatives there are", () => {
    const question = Question.create({
      statement: "Question Remove Alternative",
    });
    question.includeCorrectAlternatives([
      "Alternative Correct 1",
      "Alternative Correct 2",
    ]);
    question.includeIncorrectAlternatives([
      "Alternative Incorrect 1",
      "Alternative Incorrect 2",
    ]);

    expect(question.countIncorrectAlternatives()).toEqual(2);
  });

  it("should get values from a question", () => {
    const question = Question.create({
      statement: "Question Remove Alternative",
    });
    question.includeCorrectAlternatives(["Alternative Correct 1"]);
    question.includeIncorrectAlternatives(["Alternative Incorrect 1"]);

    expect(question.values).toEqual({
      statement: "Question Remove Alternative",
      alternatives: [
        {
          text: "Alternative Correct 1",
          isCorrect: true,
        },
        {
          text: "Alternative Incorrect 1",
          isCorrect: false,
        },
      ],
    });
  });
});
