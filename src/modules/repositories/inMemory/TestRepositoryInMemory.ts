import { PersistenceTestDTO } from "../../DTOs/PersistenceTest";
import { Test } from "../../entities/Test";
import { TestMap } from "../../mappers/TestMap";
import { TestRepository } from "../TestRepository";

class TestRepositoryInMemory implements TestRepository {
  private tests: PersistenceTestDTO[] = [];

  async getTestById(testId: string): Promise<Test> {
    const testValues = this.tests.find((t) => t.id === testId);

    if (!testValues) {
      throw new Error(`Test with id "${testId}" doesn't exist`);
    }

    return TestMap.toDomain(testValues);
  }

  exists(t: Test): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(t: Test): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async save(test: Test): Promise<Test> {
    this.tests.push(TestMap.toPersistence(test));

    return test;
  }
}

export { TestRepositoryInMemory };
