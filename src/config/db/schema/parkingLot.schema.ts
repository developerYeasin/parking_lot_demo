import {
  int,
  text,
  mysqlTable,
  varchar,
  mysqlSchema,
  mysqlEnum,
  timestamp,
  decimal,
} from "drizzle-orm/mysql-core";

export const parkingLot = mysqlTable("parking_lot", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  status: int("status").default(1),
  location: varchar("location", { length: 255 }),
  lat: decimal("lat", { precision: 10, scale: 6 }),
  lon: decimal("lon", { precision: 10, scale: 6 }),
  space: decimal("space", { precision: 10, scale: 6 }),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updateAt: timestamp("update_at").defaultNow().onUpdateNow().notNull(),
});
