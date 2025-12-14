import { defineConfig } from "@prisma/config";

export default defineConfig({
  // Use DATABASE_URL for migrations
  // Prisma 7 requires this instead of url in schema.prisma
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
