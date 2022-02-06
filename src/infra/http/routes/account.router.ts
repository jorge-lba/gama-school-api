import { Router } from "express";

import { adaptRoute } from "../../../core/infra/adapters/ExpressRoutAdapter";
import { makeAuthenticateAccountController } from "../factories/AuthenticateAccountControllerFactory";
import { makeRegisterAccountController } from "../factories/RegisterAccountControllerFactory";

const accountRoutes = Router();

accountRoutes.post("/", adaptRoute(makeRegisterAccountController()));
accountRoutes.post(
  "/authenticate",
  adaptRoute(makeAuthenticateAccountController())
);

export { accountRoutes };
