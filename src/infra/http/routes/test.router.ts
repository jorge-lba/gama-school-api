import { Router } from "express";

import { adaptMiddleware } from "../../../core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRoutAdapter";
import { makeAddTestQuestionsController } from "../factories/AddTestQuestionsController";
import { makeCreateTestController } from "../factories/CreateTestControllerFactory";
import { makeGetTestByIdController } from "../factories/GetTestByIdControllerFactory";
import { makeAuthAccountMiddleware } from "../factories/middlewares/AuthAccountMiddlewareFactory";

const testRoutes = Router();

testRoutes.use(adaptMiddleware(makeAuthAccountMiddleware()));

testRoutes.post("/", adaptRoute(makeCreateTestController()));
testRoutes.get("/:testId", adaptRoute(makeGetTestByIdController()));
testRoutes.post(
  "/:testId/question",
  adaptRoute(makeAddTestQuestionsController())
);

export { testRoutes };
