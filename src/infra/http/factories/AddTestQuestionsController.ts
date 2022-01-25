import { Controller } from "../../../core/infra/Controller";
import { TestRepositoryImp } from "../../../modules/test/repositories/prisma/TestRepositoryImp";
import { AddTestQuestions } from "../../../modules/test/useCases/commands/addTestQuestions/AddTestQuestions";
import { AddTestQuestionsController } from "../../../modules/test/useCases/commands/addTestQuestions/AddTestQuestionsController";
import { PrismaDatabase } from "../../prisma";

function makeAddTestQuestionsController(): Controller {
  const testRepository = new TestRepositoryImp(PrismaDatabase.instance);
  const addTestQuestions = new AddTestQuestions(testRepository);
  const addTestQuestionsController = new AddTestQuestionsController(
    addTestQuestions
  );

  return addTestQuestionsController;
}

export { makeAddTestQuestionsController };
