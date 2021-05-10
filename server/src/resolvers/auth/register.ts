import { Users } from "src/entities";
import RegisterInput from "src/types/arguments/registerInput";
import validateRegister from "src/utilities/auth/validateRegister";
import generateResponse from "src/utilities/generateResponse";
import { getConnection } from "typeorm";
import argon2 from "argon2";

const register = async (credentials: RegisterInput) => {
  const hashedPassword = await argon2.hash(credentials.password);

  const error = await validateRegister(credentials, "en");

  if (error) {
    return error;
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      email: credentials.email,
      username: credentials.username.toLowerCase(),
      password: hashedPassword,
      created_at: new Date().getSeconds(),
    })
    .execute();
  return generateResponse(true, "register_account_registered");
};

export default register;
