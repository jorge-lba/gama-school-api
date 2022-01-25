import { Router } from "express";

import { adaptRoute } from "../../../core/infra/adapters/ExpressRoutAdapter";
import { makeCreateTestController } from "../factories/CreateTestControllerFactory";

const testRoutes = Router();

testRoutes.post("/", adaptRoute(makeCreateTestController()));

export { testRoutes };
