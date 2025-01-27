import { createDB } from "@avtal/db";
import { Elysia } from "elysia";

export const database = createDB(process.env.DATABASE_URL!);

export const db = new Elysia({
  name: "db",
})
  .decorate("db", database)
  .as("scoped");
