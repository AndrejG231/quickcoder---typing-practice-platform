import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";

/////////////
//Utilities//
/////////////

import argon2 from "argon2";
import validateRegister from "../utilities/validateRegister";
import generateResponse from "../utilities/generateResponse";

///////////
//Objects//
///////////

import Users from "../types/entities/Users";
import ActionResponse from "../types/responses/ActionResponse";
import UserInfoResponse from  "../types/responses/UserInfoResponse"
import RegisterInput from "../types/arguments/RegisterInput";
import LoginInput from "../types/arguments/LoginInput";


////////////
//Resolver//
////////////

@Resolver(Users)
class UserAuthResolver {
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

    return generateResponse(true, "register_account_registered", "en")
  }

  @Mutation(() => ActionResponse)
  async login(@Arg("credentials") credentials: LoginInput) {
    const credType = credentials.identification.includes("@")
      ? "email"
      : "username";

    const user = await Users.findOne({
      where: { [credType]: credentials.identification },
    });

    if (!user) {
      return generateResponse(false, "login_username_notFound", "en");
    }

    const authorized = await argon2.verify(user.password, credentials.password);

    if (authorized) {

      /////Make a cookie//////

      return generateResponse(true, "login_account_loggedIn", "en")
    }

    return generateResponse(false, "login_password_invalid", "en");
  }

  @Mutation(() => ActionResponse)
  async changeKnownPassword(
    @Arg("orginalPassword", () => String) originalPassword: string,
    @Arg("newPassword", () => String) newPassowrd: String,
  ){

  }

  @Query(() => UserInfoResponse)
  async getUserInfo(@Arg("id", () => Int) id: number) {
    const user = await Users.findOne(id);

    if(user){
      return {user: user}
    }

    const error = generateResponse(false, "login_username_notFound", "en");
    return {error: error};
  }
}

export default UserAuthResolver;
