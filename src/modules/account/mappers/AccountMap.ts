import { AccountPersistenceDTO } from "../DTOs/AccountPersistenceDTO";
import { Account } from "../entities/Account";

class AccountMap {
  static toDomain({
    name,
    email,
    password,
    id,
  }: AccountPersistenceDTO): Account {
    return Account.create(
      {
        name,
        email,
        password,
        passwordIsHashed: true,
      },
      id
    );
  }

  static toPersistence(entity: Account): AccountPersistenceDTO {
    const values = entity.values;

    return {
      id: entity.id,
      name: values.name,
      email: values.email,
      password: values.password,
      verified: values.verified,
    };
  }
}

export { AccountMap };
