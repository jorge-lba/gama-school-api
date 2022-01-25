import { PrismaClient } from "@prisma/client";

class PrismaDatabase {
  private static _instance: PrismaDatabase;

  private _prisma: PrismaClient;

  private constructor() {
    this._prisma = new PrismaClient();
  }

  static get instance(): PrismaDatabase {
    if (!PrismaDatabase._instance) {
      PrismaDatabase._instance = new PrismaDatabase();
    }

    return PrismaDatabase._instance;
  }

  get prisma(): PrismaClient {
    return this._prisma;
  }

  disconnect(): void {
    this._prisma.$disconnect();
  }
}

export { PrismaDatabase };
