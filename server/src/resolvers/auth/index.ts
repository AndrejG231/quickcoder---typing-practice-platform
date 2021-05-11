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
    const response = await register(credentials);
    return response;
  }
  @Mutation(() => actionResponse)
  async login(
    @Arg("credentials") credentials: loginInput,
    @Ctx() { res }: graphqlContext
  ) {
    const response = await login(credentials, res);
    return response;
  }
  @Query(() => userInfoResponse)
  async getSignedUser(@Ctx() { req, res }: graphqlContext) {
    const response = await getSignedUser(res, req);
    return response;
  }
  @Mutation(() => actionResponse)
  async changeKnownPassword(
    @Arg("orginalPassword") originalPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: graphqlContext
  ) {
    const response = await changeKnownPassword(
      originalPassword,
      newPassword,
      req
    );
    return response;
  }
  @Mutation(() => Boolean)
  logout(@Ctx() { res }: graphqlContext) {
    res.clearCookie(process.env.COOKIE_NAME!);
    return true;
  }
  @Mutation(() => actionResponse)
  async retrievePasswordToken(@Arg("email") email: string) {
    const response = await retrievePasswordToken(email);
    return response;
  }
  @Mutation(() => actionResponse)
  async changeForgottenPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
    const response = await changeForgottenPassword(token, newPassword);
    return response;
  }
}

export default AuthResolver;
