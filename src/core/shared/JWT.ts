import { verify, sign, Algorithm } from "jsonwebtoken";

import { authConfig } from "../../config/auth";

interface JWTData {
  ctx: string;
  identifier: string;
  token: string;
}

interface JWTTokenPayload {
  exp: number;
  sub: string;
  ctx: string;
}

interface JWRSignData {
  bodyToken: any;
  subject: string;
  identifier: string;
  ctx: string;
}

class JWT {
  public readonly identifier: string;
  public readonly token: string;

  private constructor({ identifier, token }: JWTData) {
    this.identifier = identifier;
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

  static createFromJWT(token: string, ctx: string): JWT {
    const jwtPayload = this.decodeToken(token);

    const jwt = new JWT({ token, identifier: jwtPayload.sub, ctx });

    return jwt;
  }

  static sign({ bodyToken, identifier, subject, ctx }: JWRSignData): JWT {
    const token = sign(
      {
        bodyToken,
        ctx,
      },
      String(authConfig.privateKey),
      {
        subject,
        expiresIn: authConfig.expiresIn,
        algorithm: process.env.JWT_ALGORITHM as Algorithm,
      }
    );

    const jwt = new JWT({ identifier, token, ctx });

    return jwt;
  }
}

export { JWT, JWTTokenPayload };
