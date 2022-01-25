import { Controller } from "../../../core/infra/Controller";
import { TestRepositoryImp } from "../../../modules/repositories/prisma/TestRepositoryImp";
import { CreateTest } from "../../../modules/useCases/commands/createTest/CreateTest";
import { CreateTestController } from "../../../modules/useCases/commands/createTest/CreateTestController";
import { PrismaDatabase } from "../../prisma";

function makeCreateTestController(): Controller {
  const testRepository = new TestRepositoryImp(PrismaDatabase.instance);
  const createTest = new CreateTest(testRepository);
  const createTestController = new CreateTestController(createTest);

  return createTestController;
}

export { makeCreateTestController };
