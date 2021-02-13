import zxcvbn from "zxcvbn";
import typesLangList from "../../lang/typesLangList";
import keyList from "../../lang/typesKeyList";
import ActionResponse from "../../types/responses/ActionResponse";
import generateResponse from "../generateResponse";

interface validPassword {
  (password: string, lang: typesLangList, variant?: "new"):
    | false
    | ActionResponse;
}

const checkPasswordStrength: validPassword = (password, lang, variant) => {
  const action: string =
    variant === "new" ? "changePassword_newPassword" : "register_password";
  //----password strength----//
  const strengthResult = zxcvbn(password);
  if (strengthResult.score < 2) {
    return generateResponse(false, `${action}_weak` as keyList, lang);
  }
  const passwordCharTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)?/.test(password);
  if (!passwordCharTest) {
    return generateResponse(false, `${action}_noInclude` as keyList, lang);
  }

  return false;
};

export default checkPasswordStrength;
