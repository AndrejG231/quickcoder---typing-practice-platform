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

import PassTokens from "../types/entities/PassTokens";
import Users from "../types/entities/Users";
import ActionResponse from "../types/responses/ActionResponse";


const lang = "en";

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
      return generateResponse(false, "retrievePassword_email_notFound", lang);
    }

    const token = await generatePasswordRetrieveToken(user, clientInfo);

    if (!token) {
      return generateResponse(
        false,
        "retrievePassword_server_unknownError",
        lang
      );
    }

   const successfulMessage = await sendMail({
      to: "andrej.germic@gmail.com",
      subject: "Hello Myself",
      text: token.raw[0].token,
    });

    if (!successfulMessage) {
      return generateResponse(
        false,
        "retrievePassword_server_unknownError",
        lang
      );
    }

    return generateResponse(true, "retrievePassword_resetLink_sent", lang);
  }

  @Mutation(() => ActionResponse)
  async changeForgottenPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
    // ...is token expired?
    const tokenObject = await PassTokens.findOne({ token: token });

    if (!tokenObject) {
      return generateResponse(false, "retrievePassword_token_invalid", lang);
    }

    if (tokenObject.expires_at.getTime() < new Date().getTime()) {
      return generateResponse(false, "retrievePassword_token_expired", lang);
    }

    const user = await Users.findOne(tokenObject.user_id);

    if (!user) {
      return generateResponse(
        false,
        "retrievePassword_server_unknownError",
        lang
      );
    }

    const weakPassword = checkPasswordStrength(newPassword, lang);

    if (weakPassword) {
      return weakPassword;
    }

    const hashedNewPassword = await argon2.hash(newPassword);

    await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({
        password: hashedNewPassword,
        token_version: user.token_version + 1, //<-- Invalidates all signed In devices.
      })
      .where("id = :id", { id: user.id })
      .execute();

    return generateResponse(true, "changePassword_password_changed", lang);
  }
}

export default ForgotPasswordResolver;
