import {
  int,
  text,
  mysqlTable,
  varchar,
  mysqlSchema,
  mysqlEnum,
  timestamp,
} from "drizzle-orm/mysql-core";

// export const mySchema = mysqlSchema("parking_lot");
// export const mySchemaUsers = mySchema.table("users", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   address: text("address"),
// });

export const userSchema = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updateAt: timestamp("update_at").defaultNow().onUpdateNow().notNull(),
});
