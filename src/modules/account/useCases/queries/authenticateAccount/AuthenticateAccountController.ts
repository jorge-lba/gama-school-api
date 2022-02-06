import { Controller } from "../../../../../core/infra/Controller";
import { fail, HttpResponse, ok } from "../../../../../core/infra/HttpResponse";
import { AuthenticateAccount } from "./AutenticateAccount";

class AuthenticateAccountController implements Controller {
  constructor(
    private readonly authenticateAccountUseCase: AuthenticateAccount
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const result = await this.authenticateAccountUseCase.execute(request);

      return ok({
        message: "Account authenticated",
        id: result.id,
        token: result.token,
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export { AuthenticateAccountController };
