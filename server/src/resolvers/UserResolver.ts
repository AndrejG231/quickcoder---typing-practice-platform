import { Arg, Field, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

/////////////
//Utilities//
/////////////

import argon2 from "argon2";

///////////
//Objects//
///////////

import Users from "../entities/Users";
import ErrorReturn from "src/types/ErrorReturn";

@ObjectType()
class UserResponse{
  @Field(() => ErrorReturn, {nullable: true})
  error?: ErrorReturn

  @Field(() => Users, {nullable: true})
  user?: Users
}

export interface registerInput{
  username: string;
  email: string;
  password: string;
}

////////////
//Resolver//
////////////

@Resolver(Users)
class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
  
    const hashedPassword = await argon2.hash(password)


    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({ email: email, username: username, password: hashedPassword})
      .returning("*")
      .execute();

    return user;
  }

  @Query(() => Users)
  async getUserInfo(@Arg("id", () => Int) id: number) {
    const user = await Users.findOne(id);

    console.log(user);

    return user
  }
}

export default UserResolver;