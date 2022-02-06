import bcrypt from "bcryptjs";

import EncryptProvider from "../EncryptProvider";

class BCryptEncryptProvider extends EncryptProvider {
  static async hash(value: string, salt: number): Promise<string> {
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}

export { BCryptEncryptProvider };
