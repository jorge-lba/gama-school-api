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
    expect(second.equals(first)).toBeFalsy();
    expect(first.value.text).toEqual("Alternative 1");
    expect(first.value.isCorrect).toBeFalsy();
    expect(second.value.text).toEqual("Alternative 2");
    expect(second.value.isCorrect).toBeFalsy();
  });

  it("should add correct alternatives in a question", () => {
    const question = Question.create({ statement: "Question 2" });

    question.includeCorrectAlternatives([
      "Alternative Correct 1",
      "Alternative Correct 2",
    ]);

    const [first, second] = question.alternatives;
    expect(question.alternatives.length).toEqual(2);
    expect(second.equals(first)).toBeFalsy();
    expect(first.value.text).toEqual("Alternative Correct 1");
    expect(first.value.isCorrect).toBeTruthy();
    expect(second.value.text).toEqual("Alternative Correct 2");
    expect(second.value.isCorrect).toBeTruthy();
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

    question.removeAlternative(alternatives[0]);

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
      id: expect.any(String),
      statement: "Question Remove Alternative",
      alternatives: [
        {
          id: expect.any(String),
          text: "Alternative Correct 1",
          isCorrect: true,
        },
        {
          id: expect.any(String),
          text: "Alternative Incorrect 1",
          isCorrect: false,
        },
      ],
    });
  });
});
