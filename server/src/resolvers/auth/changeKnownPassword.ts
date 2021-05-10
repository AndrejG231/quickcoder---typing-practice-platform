import argon2 from "argon2";
import { Request } from "express";
import { Users } from "src/entities";
import checkPasswordStrength from "src/utilities/auth/checkPasswordStrength";
import getUserFromCookie from "src/utilities/auth/getUserFromCookie";
import generateResponse from "src/utilities/generateResponse";
import { getConnection } from "typeorm";

const changeKnownPassword = async (
  originalPassword: string,
  newPassword: string,
  req: Request
) => {
  const validUserInfo = await getUserFromCookie(req);

  if (!validUserInfo.user) {
    return validUserInfo.error;
  }

  const authorized = await argon2.verify(
    validUserInfo.user.password,
    originalPassword
  );

  if (!authorized) {
    return generateResponse(false, "login_password_invalid");
  }

  const weakPassword = checkPasswordStrength(newPassword, "new");

  if (weakPassword) {
    return weakPassword;
  }

  const hashedNewPassword = await argon2.hash(newPassword);

  await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({
      password: hashedNewPassword,
      token_version: validUserInfo.user.token_version + 1,
    })
    .where("id = :id", { id: validUserInfo.user.id })
    .execute();

  return generateResponse(true, "changePassword_password_changed");
};

export default changeKnownPassword;
