import { validate } from "email-validator";
import { Users } from "../entities/";
import { ActionResponse, RegisterInput } from "../types/";

import { generateResponse, checkPasswordStrength } from "./";

interface validateReg {
  (credentials: RegisterInput): Promise<ActionResponse | undefined>;
}

const validateRegister: validateReg = async (credentials) => {
  //----username validation----//
  const usernameCharTest = /^[a-zA-Z1-9]+$/.test(credentials.username);
  if (!usernameCharTest) {
    return generateResponse(false, "register_username_specialCharacters");
  }

  const usernameLength = credentials.username.length > 3;
  if (!usernameLength) {
    return generateResponse(false, "register_username_length");
  }

  //----email validation----//
  if (!validate(credentials.email)) {
    return generateResponse(false, "register_email_invalid");
  }

  //----Unique credentials----//
  let isEqual: Users | undefined = await Users.findOne({
    where: { username: credentials.username },
  });

  if (isEqual) {
    return generateResponse(false, "register_username_exists");
  }

  isEqual = await Users.findOne({ where: { email: credentials.email } });

  if (isEqual) {
    return generateResponse(false, "register_email_exists");
  }

  const weakPass = checkPasswordStrength(credentials.password);

  if (weakPass !== false) {
    return weakPass;
  }

  return undefined;
};

export default validateRegister;
