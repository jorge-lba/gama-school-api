import bcrypt from "bcryptjs";

class Password {
  private readonly password: string;
  private readonly hashed?: boolean;

  private constructor(password: string, hashed: boolean) {
    this.password = password;
    this.hashed = hashed;
  }

  static validate(password: string): boolean {
    if (
      !password ||
      password.trim().length < 8 ||
      password.trim().length > 128
    ) {
      return false;
    }

    return true;
  }

  public getHashedValue(): string {
    if (this.hashed) {
      return this.password;
    }

    return bcrypt.hashSync(this.password, 8);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.hashed) {
      hashed = this.password;

      return await bcrypt.compare(plainTextPassword, hashed);
    }

    return this.password === plainTextPassword;
  }

  static create(password: string, hashed: boolean = false): Password {
    if (!hashed && !this.validate(password)) {
      throw new Error("Invalid password");
    }

    return new Password(password, hashed);
  }
}

export { Password };
