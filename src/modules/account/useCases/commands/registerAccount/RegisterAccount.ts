import { UseCase } from "../../../../../core/domain/UseCase";
import { CreateAccountDTO } from "../../../DTOs/CreateAccount";
import { Account } from "../../../entities/Account";
import { JWT } from "../../../entities/JWT";
import { AccountRepository } from "../../../repositories/AccountRepository";

interface Response {
  id: string;
  token: string;
}

class RegisterAccount implements UseCase<CreateAccountDTO> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountDTO): Promise<Response> {
    const account = Account.create({ name, email, password });
    const emailAlreadyExists = await this.accountRepository.exists(account);

    if (emailAlreadyExists) {
      throw new Error("Account already exists");
    }

    const { token } = JWT.signAccount(account);

    const wasSaved = await this.accountRepository.save(account);

    return {
      id: wasSaved.id,
      token,
    };
  }
}

export { RegisterAccount };
