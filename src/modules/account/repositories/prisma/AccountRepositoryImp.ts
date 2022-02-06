import { Prisma, Account as AccountModel } from "@prisma/client";

import { PrismaDatabase } from "../../../../infra/prisma";
import { Account } from "../../entities/Account";
import { AccountMap } from "../../mappers/AccountMap";
import { AccountRepository } from "../AccountRepository";

class AccountRepositoryImp implements AccountRepository {
  private accountModel: Prisma.AccountDelegate<AccountModel>;

  constructor(prismaDatabase: PrismaDatabase) {
    this.accountModel = prismaDatabase.prisma.account;
  }

  async exists(account: Account): Promise<boolean> {
    const exists = await this.accountModel.findFirst({
      where: {
        OR: [
          {
            id: account.id,
          },
          {
            email: account.values.email,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    return !!exists;
  }

  delete(t: Account): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async findOneByEmail(email: string): Promise<Account | null> {
    const account = await this.accountModel.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        verified: true,
      },
    });

    if (!account) {
      return null;
    }

    return AccountMap.toDomain(account);
  }

  async save(account: Account): Promise<{ id: string }> {
    const value = AccountMap.toPersistence(account);
    const persistence = await this.accountModel.create({
      data: {
        id: value.id,
        name: value.name,
        email: value.email,
        password: value.password,
      },
    });

    return { id: persistence.id };
  }
}

export { AccountRepositoryImp };
