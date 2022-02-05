import { Router } from "express";

import { adaptRoute } from "../../../core/infra/adapters/ExpressRoutAdapter";
import { makeRegisterAccountController } from "../factories/RegisterAccountControllerFactory";

const accountRoutes = Router();

accountRoutes.post("/", adaptRoute(makeRegisterAccountController()));

export { accountRoutes };
