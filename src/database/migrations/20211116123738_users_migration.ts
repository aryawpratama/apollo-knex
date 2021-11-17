import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
