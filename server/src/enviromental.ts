export const envVars = {
  database_host: process.env.PG_HOST!,
  database_port: process.env.PG_PORT!,
  database_username: process.env.PG_NAME!,
  database_password: process.env.PG_PASSWORD!,
  database_user: process.env.PG_USER!,
  database_name: process.env.PG_DATABASE_NAME!,
  email_username: process.env.GM_USER!,
  email_password: process.env.GM_PASS!,
  cookie_name: process.env.COOKIE_NAME!,
  cookie_expires_key: process.env.EXPIRES!,
  cookie_user_key: process.env.USER_ID!,
  cookie_tokenv_key: process.env.TOKEN_VERSION!,
  token_secret: process.env.JWT_KEY!,
  server_port: process.env.SERVER_PORT!,
};

const testEnvs = () => {
  for (const [key, value] of Object.entries(envVars)) {
    if (typeof value !== "string" || value.length < 1) {
      throw new Error(`${key} is defined incorrectly.`);
    }
  }
  return envVars;
};

const enviromental = testEnvs();

export default enviromental;
