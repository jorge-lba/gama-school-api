import { Controller } from "../../../core/infra/Controller";
import { AccountRepositoryImp } from "../../../modules/account/repositories/prisma/AccountRepositoryImp";
import { AuthenticateAccount } from "../../../modules/account/useCases/queries/authenticateAccount/AutenticateAccount";
import { AuthenticateAccountController } from "../../../modules/account/useCases/queries/authenticateAccount/AuthenticateAccountController";
import { PrismaDatabase } from "../../prisma";

function makeAuthenticateAccountController(): Controller {
  const accountRepository = new AccountRepositoryImp(PrismaDatabase.instance);
  const authenticateAccount = new AuthenticateAccount(accountRepository);
  const authenticateAccountController = new AuthenticateAccountController(
    authenticateAccount
  );

  return authenticateAccountController;
}

export { makeAuthenticateAccountController };
