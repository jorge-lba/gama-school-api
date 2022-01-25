import { Router } from "express";

import { adaptRoute } from "../../../core/infra/adapters/ExpressRoutAdapter";
import { makeAddTestQuestionsController } from "../factories/AddTestQuestionsController";
import { makeCreateTestController } from "../factories/CreateTestControllerFactory";
import { makeGetTestByIdController } from "../factories/GetTestByIdControllerFactory";

const testRoutes = Router();

testRoutes.post("/", adaptRoute(makeCreateTestController()));
testRoutes.get("/:testId", adaptRoute(makeGetTestByIdController()));
testRoutes.post(
  "/:testId/question",
  adaptRoute(makeAddTestQuestionsController())
);

export { testRoutes };
