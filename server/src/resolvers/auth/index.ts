import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import register from "./register";
import login from "./login";
import getSignedUser from "./getSignedUser";
import changeKnownPassword from "./changeKnownPassword";
import retrievePasswordToken from "./retrievePasswordToken";
import changeForgottenPassword from "./changeForgottenPassword";

import { loginInput, registerInput } from "../../types/arguments/";
import { actionResponse, userInfoResponse } from "../../types/responses";
import { graphqlContext } from "../../types";

@Resolver()
class AuthResolver {
  @Mutation(() => actionResponse)
  async register(@Arg("credentials") credentials: registerInput) {
    return await register(credentials);
  }
  @Mutation(() => actionResponse)
  async login(
    @Arg("credentials") credentials: loginInput,
    @Ctx() { res }: graphqlContext
  ) {
    return await login(credentials, res);
  }
  @Query(() => userInfoResponse)
  async getSignedUser(@Ctx() { req, res }: graphqlContext) {
    return await getSignedUser(res, req);
  }
  @Mutation(() => actionResponse)
  async changeKnownPassword(
    @Arg("orginalPassword") originalPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: graphqlContext
  ) {
    return await changeKnownPassword(originalPassword, newPassword, req);
  }
  @Mutation(() => Boolean)
  logout(@Ctx() { res }: graphqlContext) {
    res.clearCookie(process.env.COOKIE_NAME!);
    return true;
  }
  @Mutation(() => actionResponse)
  async retrievePasswordToken(@Arg("email") email: string) {
    return await retrievePasswordToken(email);
  }
  @Mutation(() => actionResponse)
  async changeForgottenPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
    return await changeForgottenPassword(token, newPassword);
  }
}

export default AuthResolver;
