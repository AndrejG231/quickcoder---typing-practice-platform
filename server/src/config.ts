export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string);

//////////////////////
// CONNECT POSTGRES //
//////////////////////

export const PG_SETTING: object = {
  host: "localhost",
  username: process.env.PG_USER,
  database: process.env.PG_DATABASE_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
}
