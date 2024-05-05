import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "your_username",
//   password: "your_password",
//   database: "your_database",
// });

// export const db = drizzle(connection);

export const dbPool = mysql.createPool({
  // uri: "mysql://root:123456@localhost:3306/parking_lot",
  host: "localhost",
  user: "root",
  password: "123456",
  database: "parking_lot",
  port: 3306,
});

// use only in services
export const db = drizzle(dbPool, {
  // schema: schemas,
  // logger: false,
  // mode: "default",
});

// module.exports = { db };
export type IDb = typeof db;
