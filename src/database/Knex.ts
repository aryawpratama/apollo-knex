import knex from "knex";
import Config from "../../knexfile";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
export const Knex = knex(config);
