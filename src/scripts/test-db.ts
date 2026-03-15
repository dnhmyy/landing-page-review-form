import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  try {
    console.log("Checking database connection...");
    const reviewCount = await prisma.review.count();
    console.log(`Connection successful! Total reviews: ${reviewCount}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
