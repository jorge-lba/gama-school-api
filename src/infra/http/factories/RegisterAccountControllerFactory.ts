import { Controller } from "../../../core/infra/Controller";
import { AccountRepositoryImp } from "../../../modules/account/repositories/prisma/AccountRepositoryImp";
import { RegisterAccount } from "../../../modules/account/useCases/commands/registerAccount/RegisterAccount";
import { RegisterAccountController } from "../../../modules/account/useCases/commands/registerAccount/RegisterAccountController";
import { PrismaDatabase } from "../../prisma";

function makeRegisterAccountController(): Controller {
  const testRepository = new AccountRepositoryImp(PrismaDatabase.instance);
  const getTestById = new RegisterAccount(testRepository);
  const getTestByIdController = new RegisterAccountController(getTestById);

  return getTestByIdController;
}

export { makeRegisterAccountController };
