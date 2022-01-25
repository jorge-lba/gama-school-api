import { Controller } from "../../../../../core/infra/Controller";
import {
  fail,
  HttpResponse,
  created,
} from "../../../../../core/infra/HttpResponse";
import { AddTestQuestions, CreateQuestions } from "./AddTestQuestions";

interface Request extends CreateQuestions {}

class AddTestQuestionsController implements Controller {
  constructor(private addTestQuestions: AddTestQuestions) {}

  async handle({ testId, questions }: Request): Promise<HttpResponse> {
    try {
      const result = await this.addTestQuestions.execute({ testId, questions });

      return created({
        message: "Add test questions",
        ids: result,
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export { AddTestQuestionsController };
