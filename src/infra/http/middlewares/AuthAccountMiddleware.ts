import {
  fail,
  forbidden,
  HttpResponse,
  ok,
} from "../../../core/infra/HttpResponse";
import { Middleware } from "../../../core/infra/Middleware";
import { JWT } from "../../../core/shared/JWT";

interface AuthAccountMiddlewareRequest {
  accessToken: string;
}

class AuthAccountMiddleware implements Middleware {
  async handle(
    request: AuthAccountMiddlewareRequest
  ): Promise<false | HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        try {
          const decoded = JWT.decodeToken(accessToken);

          return ok({ identifier: decoded.sub, ctx: decoded.ctx });
        } catch (error) {
          return forbidden(new Error("Invalid token"));
        }
      }
      return forbidden(new Error("Invalid token"));
    } catch (error) {
      return fail(error as Error);
    }
  }
}

export { AuthAccountMiddleware };
