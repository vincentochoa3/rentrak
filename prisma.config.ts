import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Use direct connection for migrations (pooler can hang). App uses DATABASE_URL at runtime.
    url: env("DIRECT_URL"),
  },
});
