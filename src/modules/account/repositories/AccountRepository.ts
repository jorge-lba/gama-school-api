import { Repository } from "../../../core/domain/Repository";
import { Account } from "../entities/Account";

interface AccountRepository extends Repository<Account> {
  findOneByEmail(email: string): Promise<Account | null>;
}

export { AccountRepository };
