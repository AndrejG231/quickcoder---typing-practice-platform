import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

/////////////
//Utilities//
/////////////

import argon2 from "argon2";
import validateRegister from "../utilities/auth/validateRegister";
import checkPasswordStrength from "../utilities/auth/checkPasswordStrength";
import validateUserFromCookie from "../utilities/auth/validateUserFromCookie";
import getUserFromCookie from "../utilities/auth/getUserFromCookie";
import generateResponse from "../utilities/generateResponse";
import createAuthCookie from "../utilities/auth/createAuthCookie";

///////////
//Objects//
///////////

import GraphqlContext from "../types/GraphqlContext";

import Users from "../entities/Users";

import ActionResponse from "../types/responses/ActionResponse";
import UserInfoResponse from "../types/responses/UserInfoResponse";

import RegisterInput from "../types/arguments/RegisterInput";
import LoginInput from "../types/arguments/LoginInput";

////////////
//Resolver//
////////////

const lang = "en"; //...temporary

@Resolver(Users)
class UserAuthResolver {
  // REGISTER //
  @Mutation(() => ActionResponse)
  async register(@Arg("credentials") credentials: RegisterInput) {
    const hashedPassword = await argon2.hash(credentials.password);

    const error = await validateRegister(credentials, "en");

    if (error) {
      return error;
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        email: credentials.email,
        username: credentials.username.toLowerCase(),
        password: hashedPassword,
        created_at: new Date()
      })
      .execute()
    return generateResponse(true, "register_account_registered", lang);
  }

  // LOGIN //
  @Mutation(() => ActionResponse)
  async login(
    @Arg("credentials") credentials: LoginInput,
    @Arg("clientParameter") clientParameter: string,
    @Ctx() { res }: GraphqlContext
  ) {
    //resolve user
    const credType = credentials.identification.includes("@")
      ? "email"
      : "username";

    const user = await Users.findOne({
      where: { [credType]: credentials.identification },
    });

    if (!user) {
      return generateResponse(false, "login_username_notFound", lang);
    }

    //password checking and generating tokens
    const authorized = await argon2.verify(user.password, credentials.password);

    if (authorized) {
      createAuthCookie(res, user, clientParameter);
      return generateResponse(true, "login_account_loggedIn", lang);
    }

    //not authenticated...
    return generateResponse(false, "login_password_invalid", lang);
  }

  // GET USER INFO //
  @Query(() => UserInfoResponse)
  async getSignedUser(
    @Arg("clientParameter") clientParameter: string,
    @Ctx() { req, res }: GraphqlContext
  ) {
    const validationData = await validateUserFromCookie(
      req,
      clientParameter,
      lang
    );

    if (!validationData.user?.id) {
      console.log("Validation data Error", validationData);
      return validationData;
    }

    createAuthCookie(res, validationData.user, clientParameter);
    return { user: validationData.user };
  }

  // CHANGE KNOWN PASSWORD //
  @Mutation(() => ActionResponse)
  async changeKnownPassword(
    @Arg("orginalPassword") originalPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const validUserInfo = await getUserFromCookie(req, lang);

    if (!validUserInfo.user) {
      return validUserInfo.error;
    }

    const authorized = await argon2.verify(
      validUserInfo.user.password,
      originalPassword
    );

    if (!authorized) {
      return generateResponse(false, "login_password_invalid", lang);
    }

    const weakPassword = checkPasswordStrength(newPassword, lang, "new");

    if (weakPassword) {
      return weakPassword;
    }

    const hashedNewPassword = await argon2.hash(newPassword);

    await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({
        password: hashedNewPassword,
        token_version: validUserInfo.user.token_version + 1, //<-- Invalidates all signed In devices.
      })
      .where("id = :id", { id: validUserInfo.user.id })
      .execute();

    return generateResponse(true, "changePassword_password_changed", lang);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: GraphqlContext) {
    res.clearCookie(process.env.COOKIE_NAME!);
    return true
  }
}

export default UserAuthResolver;
