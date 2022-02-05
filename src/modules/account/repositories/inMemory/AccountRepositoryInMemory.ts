import { AccountPersistenceDTO } from "../../DTOs/AccountPersistenceDTO";
import { Account } from "../../entities/Account";
import { AccountMap } from "../../mappers/AccountMap";
import { AccountRepository } from "../AccountRepository";

class AccountRepositoryInMemory implements AccountRepository {
  private accounts: AccountPersistenceDTO[] = [];

  async exists(account: Account): Promise<boolean> {
    const exists = this.accounts.find(
      (item) => item.id === account.id || item.email === account.values.email
    );

    return !!exists;
  }

  delete(t: Account): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async save(account: Account): Promise<any> {
    this.accounts.push(AccountMap.toPersistence(account));

    return account;
  }
}

export { AccountRepositoryInMemory };
