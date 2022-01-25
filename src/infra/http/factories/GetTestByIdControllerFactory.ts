import { Controller } from "../../../core/infra/Controller";
import { TestRepositoryImp } from "../../../modules/repositories/prisma/TestRepositoryImp";
import { GetTestById } from "../../../modules/useCases/commands/getTestById/GetTestById";
import { GetTestByIdController } from "../../../modules/useCases/commands/getTestById/GetTestByIdController";
import { PrismaDatabase } from "../../prisma";

function makeGetTestByIdController(): Controller {
  const testRepository = new TestRepositoryImp(PrismaDatabase.instance);
  const getTestById = new GetTestById(testRepository);
  const getTestByIdController = new GetTestByIdController(getTestById);

  return getTestByIdController;
}

export { makeGetTestByIdController };
