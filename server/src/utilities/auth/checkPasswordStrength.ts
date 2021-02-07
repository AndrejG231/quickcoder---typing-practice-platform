import typesLangList from "../../lang/typesLangList";
import ActionResponse from "../../types/responses/ActionResponse";
import zxcvbn from "zxcvbn";
import generateResponse from "../generateResponse";

interface validPassword {
  (password: string, lang: typesLangList): false | ActionResponse
}

const checkPasswordStrength: validPassword= (password, lang) => {
  //----password strength----//
  const strengthResult = zxcvbn(password);
  if (strengthResult.score < 2) {
    return generateResponse(false, "register_password_weak", lang)
  }
  const passwordCharTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)?/.test(password);
  if (!passwordCharTest) {
    return generateResponse(false, "register_password_noInclude", lang)
  }

  return false;
}

export default checkPasswordStrength;