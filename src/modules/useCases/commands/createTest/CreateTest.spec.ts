import { UseCase } from "../../../../core/domain/UseCase";
import { CreateTestDTO } from "../../../DTOs/CreateTest";
import { TestRepositoryInMemory } from "../../../repositories/inMemory/TestRepositoryInMemory";
import { TestRepository } from "../../../repositories/TestRepository";
import { CreateTest } from "./CreateTest";

describe("Use Case - Create Test", () => {
  let createTestUseCase: UseCase<CreateTestDTO>;
  let testRepository: TestRepository;

  it("should created a new basic test", async () => {
    const test = await createTestUseCase.execute({
      title: "test",
    });

    const persistentTest = await testRepository.getTestById(test.id);

    expect(test.id).toEqual(persistentTest.id);
  });

  beforeAll(() => {
    testRepository = new TestRepositoryInMemory();
    createTestUseCase = new CreateTest(testRepository);
  });
});
