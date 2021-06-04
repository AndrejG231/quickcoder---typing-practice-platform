import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import register from "./register";
import login from "./login";
import getSignedUser from "./getSignedUser";
import changeKnownPassword from "./changeKnownPassword";
import retrievePasswordToken from "./retrievePasswordToken";
import changeForgottenPassword from "./changeForgottenPassword";

import {
  LoginInput,
  RegisterInput,
  ActionResponse,
  UserInfoResponse,
  GraphqlContext,
} from "../../types";

@Resolver()
class AuthResolver {
  @Mutation(() => ActionResponse)
  async register(@Arg("credentials") credentials: RegisterInput) {
    const response = await register(credentials);
    return response;
  }
  @Mutation(() => ActionResponse)
  async login(
    @Arg("credentials") credentials: LoginInput,
    @Ctx() { res }: GraphqlContext
  ) {
    const response = await login(credentials, res);
    return response;
  }
  @Query(() => UserInfoResponse)
  async getSignedUser(@Ctx() { req, res }: GraphqlContext) {
    const response = await getSignedUser(res, req);
    return response;
  }
  @Mutation(() => ActionResponse)
  async changeKnownPassword(
    @Arg("orginalPassword") originalPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const response = await changeKnownPassword(
      originalPassword,
      newPassword,
      req
    );
    return response;
  }
  @Mutation(() => Boolean)
  logout(@Ctx() { res }: GraphqlContext) {
    res.clearCookie(process.env.COOKIE_NAME!);
    return true;
  }
  @Mutation(() => ActionResponse)
  async retrievePasswordToken(@Arg("email") email: string) {
    const response = await retrievePasswordToken(email);
    return response;
  }
  @Mutation(() => ActionResponse)
  async changeForgottenPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
    const response = await changeForgottenPassword(token, newPassword);
    return response;
  }
}

export default AuthResolver;
