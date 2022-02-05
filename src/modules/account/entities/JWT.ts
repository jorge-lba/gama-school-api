import { verify, sign, Algorithm } from "jsonwebtoken";

import { authConfig } from "../../../config/auth";
import { Account } from "./Account";

interface JWTData {
  accountId: string;
  token: string;
}

interface JWTTokenPayload {
  exp: number;
  sub: string;
}

class JWT {
  public readonly accountId: string;
  public readonly token: string;

  private constructor({ accountId, token }: JWTData) {
    this.accountId = accountId;
    this.token = token;
  }

  static decodeToken(token: string): JWTTokenPayload {
    try {
      const decoded = verify(
        token,
        String(authConfig.publicKey)
      ) as JWTTokenPayload;

      return decoded;
    } catch (err) {
      throw new Error(`Invalid token: ${(err as Error).message}`);
    }
  }

  static createFromJWT(token: string): JWT {
    const jwtPayload = this.decodeToken(token);

    const jwt = new JWT({ token, accountId: jwtPayload.sub });

    return jwt;
  }

  static signAccount(account: Account): JWT {
    const token = sign(
      {
        email: account.values.email,
      },
      String(authConfig.privateKey),
      {
        subject: account.id,
        expiresIn: authConfig.expiresIn,
        algorithm: process.env.JWT_ALGORITHM as Algorithm,
      }
    );

    const jwt = new JWT({ accountId: account.id, token });

    return jwt;
  }
}

export { JWT, JWTTokenPayload };
