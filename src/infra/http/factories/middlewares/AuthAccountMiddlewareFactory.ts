import { Middleware } from "../../../../core/infra/Middleware";
import { AuthAccountMiddleware } from "../../middlewares/AuthAccountMiddleware";

function makeAuthAccountMiddleware(): Middleware {
  const authAccountMiddleware = new AuthAccountMiddleware();

  return authAccountMiddleware;
}

export { makeAuthAccountMiddleware };
