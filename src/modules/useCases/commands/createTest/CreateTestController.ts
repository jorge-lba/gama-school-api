import { Controller } from "../../../../core/infra/Controller";
import {
  fail,
  HttpResponse,
  created,
} from "../../../../core/infra/HttpResponse";
import { CreateTestDTO } from "../../../DTOs/CreateTest";
import { CreateTest } from "./CreateTest";

interface Request extends CreateTestDTO {}

class CreateTestController implements Controller {
  constructor(private createTest: CreateTest) {}

  async handle({ title, questions }: Request): Promise<HttpResponse> {
    try {
      const result = await this.createTest.execute({ title, questions });

      return created({
        message: "Test created",
        id: result.id,
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export { CreateTestController };
