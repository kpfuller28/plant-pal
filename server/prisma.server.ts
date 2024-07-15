const globalAny: any = global;
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
declare global {
  let __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!globalAny.__db) {
    globalAny.__db = new PrismaClient();
    globalAny.__db.$connect();
  }
  prisma = globalAny.__db;
}

export { prisma };
