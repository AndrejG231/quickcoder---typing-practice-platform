import { Arg, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

///////////
//Objects//
///////////

import argon2 from "argon2";
import generateResponse from "../utilities/generateResponse";
import sendMail from "../utilities/sendMail";
import generatePasswordRetrieveToken from "../utilities/auth/generatePasswordRetrieveToken";
import checkPasswordStrength from "../utilities/auth/checkPasswordStrength";

/////////////
//Utilities//
/////////////

import PassTokens from "../entities/PassTokens";
import Users from "../entities/Users";
import ActionResponse from "../types/responses/ActionResponse";

@Resolver(PassTokens)
class ForgotPasswordResolver {
  // RETRIEVE FORGOT PASSWORD TOKEN //
  @Mutation(() => ActionResponse)
  async retrievePasswordToken(
    @Arg("email") email: string,
    @Arg("clientInfo") clientInfo: string
  ) {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return generateResponse(false, "retrievePassword_email_notFound");
    }

    const token = await generatePasswordRetrieveToken(user, clientInfo);

    if (!token) {
      return generateResponse(false, "retrievePassword_server_unknownError");
    }

    const successfulMessage = await sendMail({
      to: "andrej.germic@gmail.com",
      subject: "Hello Myself",
      text: token.raw[0].token,
    });

    if (!successfulMessage) {
      return generateResponse(false, "retrievePassword_server_unknownError");
    }

    return generateResponse(true, "retrievePassword_resetLink_sent");
  }

  @Mutation(() => ActionResponse)
  async changeForgottenPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
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
  }
}

export default ForgotPasswordResolver;
