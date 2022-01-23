import { Test } from "./Test";

describe("Entity - Test", () => {
  it("should be create a new test", () => {
    const test = Test.create({ title: "test" });

    expect(test.id).toEqual(expect.any(String));
  });

  it("should be create a new test and contain a title", () => {
    const test = Test.create({ title: "test" });

    expect(test.title).toEqual("test");
  });

  it("should be add a question in test", () => {
    const test = Test.create({ title: "test" });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    const [question] = test?.questions;
    expect(test.questions?.length).toEqual(1);
    expect(question.statement).toEqual("Question");
    expect(question.alternatives?.length).toEqual(3);
  });

  it("should be possible to add equal questions", () => {
    const test = Test.create({ title: "test" });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    const addQuestion = () =>
      test.addQuestion({
        statement: "Question",
        correctAlternatives: ["Alternative Correct"],
        incorrectAlternatives: ["Alternative 3", "Alternative 4"],
      });

    expect(addQuestion).toThrowError('Question "Question" already exists');
  });

  it("should be remove a question by id in test", () => {
    const test = Test.create({ title: "test" });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    test.addQuestion({
      statement: "Question 2",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    test.removeQuestionById(test.questions[0].id);

    const [question] = test?.questions;

    expect(test.questions?.length).toEqual(1);
    expect(question.statement).toEqual("Question 2");
  });

  it("should list the alternatives of a question", () => {
    const test = Test.create({ title: "test" });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    const alternatives = test.listAlternativesByQuestionId(
      test.questions[0].id
    );
    expect(alternatives.length).toEqual(3);
  });

  it("should count how many question there are", () => {
    const test = Test.create({ title: "test" });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    test.addQuestion({
      statement: "Question 2",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    expect(test.countQuestions()).toEqual(2);
  });

  it("should get values from a test", () => {
    const test = Test.create({ title: "test" });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    expect(test.values).toEqual(
      expect.objectContaining({
        title: "test",
        questions: expect.arrayContaining([
          expect.objectContaining({
            statement: "Question",
            alternatives: expect.arrayContaining([
              expect.objectContaining({
                text: "Alternative Correct",
                isCorrect: true,
              }),
            ]),
          }),
        ]),
      })
    );
  });
});
