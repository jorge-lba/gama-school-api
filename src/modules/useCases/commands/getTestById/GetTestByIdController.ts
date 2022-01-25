import { Controller } from "../../../../core/infra/Controller";
import { fail, HttpResponse, ok } from "../../../../core/infra/HttpResponse";
import { TestMap } from "../../../mappers/TestMap";
import { GetTestById } from "./GetTestById";

interface Request {
  testId: string;
}

class GetTestByIdController implements Controller {
  constructor(private getTestById: GetTestById) {}

  async handle({ testId }: Request): Promise<HttpResponse> {
    try {
      const result = await this.getTestById.execute(testId);

      return ok({
        data: TestMap.toResponse(result),
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export { GetTestByIdController };
