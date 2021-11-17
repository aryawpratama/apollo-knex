import { Knex } from "knex";
require("dotenv-safe").config();
interface IConfig {
  [field: string]: Knex.Config;
}
const Config: IConfig = {
  development: {
    client: process.env.DB_CONN,
    connection: {
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
export default Config;
