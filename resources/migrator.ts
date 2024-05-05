import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql2 from "mysql2/promise";
import path from "path";

const doMigrate = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "parking_lot",
    });

    const dbMigrator = drizzle(connection);

    await migrate(dbMigrator, {
      migrationsFolder: path.resolve("resources", "drizzle", "migrations"),
    });

    console.log("Migration is done");
    process.exit(0);
  } catch (error) {
    console.log("Migration error:", error);
    process.exit(1); // Exiting with a non-zero code indicates failure
  }
};

doMigrate();
