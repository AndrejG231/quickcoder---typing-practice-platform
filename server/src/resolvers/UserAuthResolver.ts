import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

/////////////
//Utilities//
/////////////

import argon2 from "argon2";
import validateRegister from "../utilities/validateRegister";
import checkPasswordStrength from "../utilities/checkPasswordStrength";
import validateUserFromCookie from "../utilities/validateUserFromCookie";
import getUserFromCookie from "../utilities/getUserFromCookie";
import generateResponse from "../utilities/generateResponse";
import createAuthCookie from "../utilities/createAuthCookie";

///////////
//Objects//
///////////

import GraphqlContext from "../types/GraphqlContext";

import Users from "../types/entities/Users";

import ActionResponse from "../types/responses/ActionResponse";
import UserInfoResponse from "../types/responses/UserInfoResponse";

import RegisterInput from "../types/arguments/RegisterInput";
import LoginInput from "../types/arguments/LoginInput";
import { userInfo } from "os";

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
    const validationData = await validateUserFromCookie(
      req,
      clientParameter,
      lang
    );

    if (!validationData.user?.id) {
      console.log("Validation data Error", validationData)
      return validationData;
    }

    createAuthCookie(res, validationData.user, clientParameter);
    return { user: validationData.user };
  }

  // CHANGE KNOWN PASSWORD //
  @Mutation(() => ActionResponse)
  async changeKnownPassword(
    @Arg("orginalPassword") originalPassword: string,
    @Arg("newPassword") newPassowrd: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const validUserInfo= await getUserFromCookie(req, lang);

    if(!validUserInfo.user){
      return validUserInfo.error
    }

    const authorized = await argon2.verify(validUserInfo.user.password, originalPassword);

    if(!authorized){
      return generateResponse(false, "login_password_invalid", lang)
    }

    const weakPassword = checkPasswordStrength(newPassowrd, lang)

    if(weakPassword){
      return weakPassword
    }

    const hashedNewPassword = await argon2.hash(newPassowrd);

    await getConnection()
    .createQueryBuilder()
    .update(Users)
    .set({ password:  hashedNewPassword})
    .where("id = :id", { id: validUserInfo.user.id })
    .execute();
    
    return generateResponse(true, "changePassword_password_changed", lang)
  }
}

export default UserAuthResolver;
