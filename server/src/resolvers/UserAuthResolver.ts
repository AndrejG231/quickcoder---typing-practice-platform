import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

/////////////
//Utilities//
/////////////

import argon2, { verify } from "argon2";
import { sign, decode } from "jsonwebtoken";
import validateRegister from "../utilities/validateRegister";
import generateResponse from "../utilities/generateResponse";
import createAuthCookie from "../utilities/createAuthCookie";
import getCookieValue from "../utilities/getCookieValue";

///////////
//Objects//
///////////

import GraphqlContext from "../types/GraphqlContext";

import Users from "../types/entities/Users";

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
        username: credentials.username,
        password: hashedPassword,
      })
      .execute();

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
  @Mutation(() => UserInfoResponse)
  async getSignedUser(
    @Arg("clientParameter") clientParameter: string,
    @Ctx() { req, res }: GraphqlContext
  ) {
    if (!req.headers.cookie) {
      return {
        error: generateResponse(false, "getUserInfo_cookies_notFound", lang),
      };
    }
    const cookie = getCookieValue(req.headers.cookie, process.env.COOKIE_NAME!);

    //...is there a cookie?
    if (typeof cookie !== "string") {
      return {
        error: generateResponse(false, "getUserInfo_token_notFound", lang),
      };
    }
    const decodedCookie = decode(cookie) as any;
    const currentTime = new Date().getTime();

    //...is token expired?
    if (currentTime > decodedCookie.time) {
      return {
        error: generateResponse(false, "getUserInfo_token_outdated", lang),
      };
    }

    //...does clientParameter match?
    if (decodedCookie.clientParameter !== clientParameter) {
      return {
        error: generateResponse(
          false,
          "getUserInfo_clientParameter_invalid",
          lang
        ),
      };
    }

    //...is there such a user?
    const user = await Users.findOne(decodedCookie.userId);
    if (!user) {
      return {
        error: generateResponse(false, "getUserInfo_user_notFound", lang),
      };
    }

    //...does token version match?
    if (decodedCookie.token_version !== user.token_version) {
      return {
        error: generateResponse(false, "getUserInfo_token_outdated", lang),
      };
    }

    //...all good, refreshing cookie and returning user..

    createAuthCookie(res, user, clientParameter);
    return { user: user };
  }

  // CHANGE KNOWN PASSWORD //
  // @Mutation(() => ActionResponse)
  // async changeKnownPassword(
  //   @Arg("orginalPassword") originalPassword: string,
  //   @Arg("newPassword") newPassowrd: string,
  //   @Ctx() { req }: GraphqlContext
  // ) {
  //   const cookie = getCookieValue(req.headers.cookie!, process.env.COOKIE_NAME!)
  //   if (!cookie){
  //     return {error: generateResponse(false, 'changePassword_user_notAuthenticated', lang)}
  //   }

  //   const tokenData = verify()

  //   const user = await Users.findOne(cookie.userId)
  // }
}

export default UserAuthResolver;
