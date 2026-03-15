/** @type {import('prisma/config').PrismaConfig} */
export default {
  schema: "prisma/schema.prisma",
  // Prisma 7 uses this for migrations/CLI
  url: process.env.DATABASE_URL,
};
