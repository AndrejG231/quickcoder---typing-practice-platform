// SERVER PORT INT //
export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT!);

//////////////////////
// CONNECT POSTGRES //
//////////////////////

export const PG_SETTING: object = {
  host: process.env.PG_HOST,
  type: "mysql",
  username: process.env.PG_USER,
  database: process.env.PG_DATABASE_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  logging: true,
  synchronize: true,
};
