import { Controller } from "../../../core/infra/Controller";
import { TestRepositoryImp } from "../../../modules/test/repositories/prisma/TestRepositoryImp";
import { GetTestById } from "../../../modules/test/useCases/queries/getTestById/GetTestById";
import { GetTestByIdController } from "../../../modules/test/useCases/queries/getTestById/GetTestByIdController";
import { PrismaDatabase } from "../../prisma";

function makeGetTestByIdController(): Controller {
  const testRepository = new TestRepositoryImp(PrismaDatabase.instance);
  const getTestById = new GetTestById(testRepository);
  const getTestByIdController = new GetTestByIdController(getTestById);

  return getTestByIdController;
}

export { makeGetTestByIdController };
