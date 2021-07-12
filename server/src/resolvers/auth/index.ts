import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import register from "./register";
import login from "./login";
import getSignedUser from "./getSignedUser";
import changeKnownPassword from "./changeKnownPassword";
import retrievePasswordToken from "./retrievePasswordToken";
import changeForgottenPassword from "./changeForgottenPassword";
import changeEmail from "./changeEmail";
import changeUsername from "./changeUsername";
import deleteAccount from "./deleteAccount";
import changePreference from "./changePreference";

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
  @Mutation(() => ActionResponse)
  async changeUsername(
    @Arg("newUsername") newUsername: string,
    @Arg("password") password: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const response = await changeUsername(req, newUsername, password);
    return response;
  }
  @Mutation(() => ActionResponse)
  async changeEmail(
    @Arg("newEmail") newEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const response = await changeEmail(req, newEmail, password);
    return response;
  }
  @Mutation(() => ActionResponse)
  async deleteAccount(
    @Arg("password") password: string,
    @Ctx() { req, res }: GraphqlContext
  ) {
    const response = await deleteAccount(res, req, password);
    return response;
  }
  @Mutation(() => ActionResponse)
  async changePreference(
    @Arg("field") field: string,
    @Arg("value", { nullable: true }) value: string,
    @Arg("toggleTo", { nullable: true }) toggleTo: boolean,
    @Ctx()
    { req }: GraphqlContext
  ) {
    const response = await changePreference(
      req,
      field,
      value ? value : toggleTo
    );
    return response;
  }
}

export default AuthResolver;
