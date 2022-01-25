import { UseCase } from "../../../../core/domain/UseCase";
import { Test } from "../../../entities/Test";
import { TestRepositoryInMemory } from "../../../repositories/inMemory/TestRepositoryInMemory";
import { TestRepository } from "../../../repositories/TestRepository";
import { GetTestById } from "./GetTestById";

describe("Use Case - Get Test By Id", () => {
  let getTestByIdUseCase: UseCase<string>;
  let testRepository: TestRepository;

  let TEST: Test;

  it("should get one test by id", async () => {
    const test = await getTestByIdUseCase.execute(TEST.id);

    expect(test.equals(TEST)).toBeTruthy();
  });

  beforeAll(async () => {
    testRepository = new TestRepositoryInMemory();
    getTestByIdUseCase = new GetTestById(testRepository);

    const test = Test.create({
      title: "test",
    });

    test.addQuestion({
      statement: "Question",
      correctAlternatives: ["Alternative Correct"],
      incorrectAlternatives: ["Alternative 3", "Alternative 4"],
    });

    TEST = await testRepository.save(test);
  });
});
