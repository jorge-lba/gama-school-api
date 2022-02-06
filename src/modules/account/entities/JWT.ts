import { JWT } from "../../../core/shared/JWT";
import { Account } from "./Account";

interface JWTTokenPayload {
  exp: number;
  sub: string;
}

class JWTAccount {
  static signAccount(account: Account): JWT {
    const jwt = JWT.sign({
      bodyToken: {
        email: account.values.email,
      },
      identifier: account.id,
      subject: account.id,
      ctx: "account",
    });
    return jwt;
  }
}

export { JWTAccount, JWTTokenPayload };
