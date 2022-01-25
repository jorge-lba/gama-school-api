import { UseCase } from "../../../../../core/domain/UseCase";
import { CreateQuestionDTO } from "../../../DTOs/CreateTest";
import { TestRepository } from "../../../repositories/TestRepository";

interface Response {
  ids: string[];
}

interface CreateQuestions {
  questions: CreateQuestionDTO[];
  testId: string;
}

class AddTestQuestions implements UseCase<CreateQuestions> {
  constructor(private testRepository: TestRepository) {}

  async execute({ testId, questions }: CreateQuestions): Promise<Response> {
    const test = await this.testRepository.getTestById(testId);

    questions?.forEach((question) => {
      test.addQuestion(question);
    });

    const wasSaved = await this.testRepository.save(test);

    if (!wasSaved) {
      throw new Error("Test wasn't saved");
    }

    return { ids: test.questions.map((question) => question.id) };
  }
}

export { AddTestQuestions, CreateQuestions };
