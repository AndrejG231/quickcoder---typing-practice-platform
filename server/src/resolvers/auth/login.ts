import { Response } from "express";
import { Users } from "src/entities";
import argon2 from "argon2";
import LoginInput from "src/types/arguments/LoginInput";
import createAuthCookie from "src/utilities/auth/createAuthCookie";
import generateResponse from "src/utilities/generateResponse";

const login = async (credentials: LoginInput, res: Response) => {
  //resolve user
  const credType = credentials.identification.includes("@")
    ? "email"
    : "username";

  const user = await Users.findOne({
    where: { [credType]: credentials.identification },
  });

  if (!user) {
    return generateResponse(false, "login_username_notFound");
  }

  //password checking and generating tokens
  const authorized = await argon2.verify(user.password, credentials.password);

  if (authorized) {
    createAuthCookie(res, user);
    return generateResponse(true, "login_account_loggedIn");
  }

  //not authenticated...
  return generateResponse(false, "login_password_invalid");
};

export default login;
