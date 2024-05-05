import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./src/config/db/schema/**/**",
  out: "./resources/drizzle/migrations",
  breakpoints: true,
  driver: "mysql2", // Use "mysql2" instead of "mysql"
  dbCredentials: {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "parking_lot",
  },
};

export default config;
