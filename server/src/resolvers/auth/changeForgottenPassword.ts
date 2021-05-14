import argon2 from "argon2";
import { PassTokens, Users } from "../../entities";
import { checkPasswordStrength, generateResponse } from "../../utilities/";
import { getConnection } from "typeorm";

const changeForgottenPassword = async (token: string, newPassword: string) => {
  // ...is token expired?
  try {
    const tokenObject = await PassTokens.findOne({ token: token });
    if (!tokenObject) {
      return generateResponse(false, "retrievePassword_token_invalid");
    }

    if (!tokenObject.valid) {
      return generateResponse(false, "retrievePassword_token_invalid");
    }

    if (tokenObject.expires_at.getTime() < new Date().getTime()) {
      return generateResponse(false, "retrievePassword_token_expired");
    }

    const user = await Users.findOne(tokenObject.user_id);

    if (!user) {
      return generateResponse(false, "retrievePassword_server_unknownError");
    }

    const weakPassword = checkPasswordStrength(newPassword);

    if (weakPassword) {
      return weakPassword;
    }

    const hashedNewPassword = await argon2.hash(newPassword);

    await getConnection()
      .createQueryBuilder()
      .update(PassTokens)
      .set({
        valid: false,
      })
      .where("id = :id", { id: tokenObject.id })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({
        password: hashedNewPassword,
        token_version: user.token_version + 1, //<-- Invalidates all signed In devices.
      })
      .where("id = :id", { id: user.id })
      .execute();

    return generateResponse(true, "changePassword_password_changed");
    //
  } catch (error) {
    console.log(error);
    return generateResponse(false, "retrievePassword_token_invalid");
  }
};

export default changeForgottenPassword;
