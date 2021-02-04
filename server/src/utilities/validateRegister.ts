import { validate } from "email-validator";
import zxcvbn from "zxcvbn";

import LangList from "../lang/typesLangList";

import User from "../entities/Users";

import ErrorReturn from "../types/ErrorReturn";
import RegisterInput from "../types/RegisterInput";

import generateError from "../utilities/generateError";

interface validateReg {
  (credentials: RegisterInput, lang: LangList): Promise<
    { error: ErrorReturn } | undefined
  >;
}

const validateRegister: validateReg = async (credentials, lang) => {
  //----username validation----//
  const usernameCharTest = /^[a-zA-Z1-9]+$/.test(credentials.username);
  if (!usernameCharTest) {
    return generateError("register_username_specialCharacters", lang);
  }

  //----email validation----//
  if (!validate(credentials.email)) {
    return generateError("register_email_invalid", lang);
  }

  //----Unique credentials----//
  let isEqual: User | undefined = await User.findOne({
    where: { username: credentials.username },
  });

  if (isEqual) {
    return generateError("register_username_exists", lang);
  }

  isEqual = await User.findOne({ where: { email: credentials.email } });

  if (isEqual) {
    return generateError("register_email_exists", lang);
  }

  //----password strength----//
  const strengthResult = zxcvbn(credentials.password);
  if (strengthResult.score < 3) {
    return generateError("register_password_weak", lang);
  }
  const passwordCharTest = /[A-Za-z1-9]+/.test(credentials.password);
  if (!passwordCharTest) {
    return generateError("register_password_noInclude", lang);
  }

  return undefined;
};

export default validateRegister;
