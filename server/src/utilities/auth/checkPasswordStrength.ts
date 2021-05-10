import zxcvbn from "zxcvbn";
import ActionResponse from "../../types/responses/actionResponse";
import generateResponse from "../generateResponse";

interface validPassword {
  (password: string, variant?: "new"): false | ActionResponse;
}

const checkPasswordStrength: validPassword = (password, variant) => {
  const action: string =
    variant === "new" ? "changePassword_newPassword" : "register_password";

  const strengthResult = zxcvbn(password);

  if (strengthResult.score < 2) {
    return generateResponse(false, `${action}_weak`);
  }

  const passwordCharTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)?/.test(password);

  if (!passwordCharTest) {
    return generateResponse(false, `${action}_noInclude`);
  }

  return false;
};

export default checkPasswordStrength;
