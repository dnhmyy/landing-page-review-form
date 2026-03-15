try {
  require("dotenv/config");
} catch (e) {
  // dotenv tidak ditemukan di lingkungan produksi Docker, 
  // tapi tidak apa-apa karena variabel lingkungan sudah disediakan oleh Docker/Compose
}

/** @type {import('prisma/config').PrismaConfig} */
export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
