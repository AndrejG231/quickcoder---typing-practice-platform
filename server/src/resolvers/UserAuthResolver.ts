import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";

/////////////
//Utilities//
/////////////

import argon2 from "argon2";
import validateRegister from "../utilities/validateRegister";

///////////
//Objects//
///////////

import Users from "../entities/Users";

import ErrorReturn from "../types/ErrorReturn";
import RegisterInput from "../types/RegisterInput";
import LoginInput from "../types/LoginInput";
import generateError from "../utilities/generateError";

@ObjectType()
class UserResponse {
  @Field(() => ErrorReturn, { nullable: true })
  error?: ErrorReturn;

  @Field(() => Users, { nullable: true })
  user?: Users;
}

////////////
//Resolver//
////////////

@Resolver(Users)
class UserAuthResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("credentials") credentials: RegisterInput) {
    const hashedPassword = await argon2.hash(credentials.password);

    const error = await validateRegister(credentials, "en");

    console.log("ERRORS:", error);

    if (error) {
      return error;
    }

    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        email: credentials.email,
        username: credentials.username,
        password: hashedPassword,
      })
      .returning("*")
      .execute();

    return { user: user.raw[0] };
  }

  @Mutation(() => UserResponse)
  async login(@Arg("credentials") credentials: LoginInput) {
    const credType = credentials.identification.includes("@")
      ? "email"
      : "username";

    const user = await Users.findOne({
      where: { [credType]: credentials.identification },
    });

    if (!user) {
      return generateError("login_username_notFound", "en");
    }

    const authorized = argon2.verify(user.password, credentials.password);

    if(!authorized){
      return generateError("login_password_invalid", "en");
    }
    return {user: user};
  }

  @Query(() => Users)
  async getUserInfo(@Arg("id", () => Int) id: number) {
    const user = await Users.findOne(id);

    console.log(user);

    return { user: user };
  }
}

export default UserAuthResolver;
