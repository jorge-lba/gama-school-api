import { UseCase } from "../../../../../core/domain/UseCase";
import { AuthenticateAccountDTO } from "../../../DTOs/AuthenticateAccount";
import { JWTAccount } from "../../../entities/JWT";
import { AccountRepository } from "../../../repositories/AccountRepository";

interface Response {
  id: string;
  token: string;
}

class AuthenticateAccount implements UseCase<AuthenticateAccountDTO> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAccountDTO): Promise<Response> {
    const account = await this.accountRepository.findOneByEmail(email);

    if (!account) {
      throw new Error("Email or Password not found");
    }

    if (!account.checkPassword(password)) {
      throw new Error("Email or Password not found");
    }

    const { token } = JWTAccount.signAccount(account);

    return {
      id: account.id,
      token,
    };
  }
}

export { AuthenticateAccount };
