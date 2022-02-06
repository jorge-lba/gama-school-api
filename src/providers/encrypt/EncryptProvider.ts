abstract class EncryptProvider {
  static hash(value: string, salt: number): Promise<string> {
    throw new Error("Method not implemented.");
  }

  static compare(value: string, hash: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export default EncryptProvider;
