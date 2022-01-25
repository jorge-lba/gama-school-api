import { UseCase } from "../../../../../core/domain/UseCase";
import { Test } from "../../../entities/Test";
import { TestRepository } from "../../../repositories/TestRepository";

class GetTestById implements UseCase<string> {
  constructor(private testRepository: TestRepository) {}

  async execute(id: string): Promise<Test> {
    return this.testRepository.getTestById(id);
  }
}

export { GetTestById };
