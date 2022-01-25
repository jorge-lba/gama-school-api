import { UseCase } from "../../../../../core/domain/UseCase";
import { CreateTestDTO } from "../../../DTOs/CreateTest";
import { Test } from "../../../entities/Test";
import { TestRepository } from "../../../repositories/TestRepository";

interface Response {
  id: string;
}

class CreateTest implements UseCase<CreateTestDTO> {
  constructor(private testRepository: TestRepository) {}

  async execute({ title, questions }: CreateTestDTO): Promise<Response> {
    const test = Test.create({ title });

    questions?.forEach((question) => {
      test.addQuestion(question);
    });

    const wasSaved = await this.testRepository.save(test);

    if (!wasSaved) {
      throw new Error("Test wasn't saved");
    }

    return { id: test.id };
  }
}

export { CreateTest };
