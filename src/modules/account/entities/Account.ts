import { Entity } from "../../../core/domain/Entity";
import { Email } from "./Email";
import { Name } from "./Name";
import { Password } from "./Password";

interface IAccountProps {
  name: Name;
  email: Email;
  password: Password;
  verified: boolean;
}

interface ICreateAccountProps {
  name: string;
  email: string;
  password: string;
  passwordIsHashed?: boolean;
}

interface IAccountValues {
  id?: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

class Account extends Entity<IAccountProps> {
  private constructor(props: IAccountProps, id?: string) {
    super(props, id);
  }

  get values(): IAccountValues {
    return {
      id: this.id,
      name: this.props.name.value,
      email: this.props.email.value,
      password: this.props.password.getHashedValue(),
      verified: this.props.verified,
    };
  }

  checkPassword(password: string): boolean {
    return this.props.password.comparePassword(password);
  }

  static create(props: ICreateAccountProps, id?: string): Account {
    return new Account(
      {
        name: Name.create(props.name),
        email: Email.create(props.email),
        password: Password.create(props.password, props.passwordIsHashed),
        verified: false,
      },
      id
    );
  }
}

export { Account };
