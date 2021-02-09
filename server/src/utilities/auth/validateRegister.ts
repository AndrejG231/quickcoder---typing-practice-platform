import { validate } from "email-validator";

import LangList from "../../lang/typesLangList";

import User from "../../types/entities/Users";

import ActionResponse from "../../types/responses/ActionResponse";
import RegisterInput from "../../types/arguments/RegisterInput";

import generateResponse from "../generateResponse";
import checkPasswordStrength from "./checkPasswordStrength";

interface validateReg {
  (credentials: RegisterInput, lang: LangList): Promise<
  ActionResponse | undefined>;
}

const validateRegister: validateReg = async (credentials, lang) => {
  //----username validation----//
  const usernameCharTest = /^[a-zA-Z1-9]+$/.test(credentials.username);
  if (!usernameCharTest) {
    return generateResponse(false, "register_username_specialCharacters", lang)
  }

  const usernameLength = credentials.username.length > 3;
  if(!usernameLength){
    return generateResponse(false, "register_username_length", lang)
  }

  //----email validation----//
  if (!validate(credentials.email)) {
    return generateResponse(false, "register_email_invalid", lang)
  }

  //----Unique credentials----//
  let isEqual: User | undefined = await User.findOne({
    where: { username: credentials.username },
  });

  if (isEqual) {
    return generateResponse(false, "register_username_exists", lang)
  }

  isEqual = await User.findOne({ where: { email: credentials.email } });

  if (isEqual) {
    return generateResponse(false, "register_email_exists", lang)
  }

  const weakPass = checkPasswordStrength(credentials.password, lang)
  
  if(weakPass !== false){
    return weakPass;
  }

  return undefined;
};

export default validateRegister;
