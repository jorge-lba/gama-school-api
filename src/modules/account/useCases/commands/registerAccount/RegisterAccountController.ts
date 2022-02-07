import { Controller } from "../../../../../core/infra/Controller";
import {
  conflict,
  created,
  HttpResponse,
} from "../../../../../core/infra/HttpResponse";
import { RegisterAccount } from "./RegisterAccount";

class RegisterAccountController implements Controller {
  constructor(private readonly registerUseCase: RegisterAccount) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const result = await this.registerUseCase.execute(request);

      return created({
        message: "Account created",
        id: result.id,
        token: result.token,
      });
    } catch (error) {
      return conflict(error as Error);
    }
  }
}

export { RegisterAccountController };
