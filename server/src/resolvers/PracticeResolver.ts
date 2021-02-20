import GraphqlContext from "../types/GraphqlContext";
import validateUserFromCookie from "../utilities/auth/validateUserFromCookie";
import generatePracticeString from "../utilities/practices/generatePracticeString";
import { Arg, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

import Practices from "../types/entities/Practices";
import { PracticeStringsKeys } from "../data/PracticeStrings";
import PracticeInfoResponse from "../types/responses/PracticeInfoResponse";
import generateResponse from "../utilities/generateResponse";

@Resolver(Practices)
class PracticeResolver {
  @Mutation(() => PracticeInfoResponse)
  async createPractice(
    @Arg("practiceName", () => String) practiceName: PracticeStringsKeys,
    @Arg("clientParameter") clientParameter: string,
    @Arg("length", () => Int) length: number,
    @Ctx() { req }: GraphqlContext
  ) {
    let { user } = await validateUserFromCookie(req, clientParameter, "en");

    if (!user) {
      //Not signed it ==> Use Cookies
      return {
        result: generateResponse(
          false,
          "getPracticesObject_practice_created",
          "en"
        ),
      };
    }
    //signed User
    const practice = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Practices)
      .values({
        user_id: user.id,
        string: generatePracticeString(practiceName, length),
      })
      .returning("*")
      .execute();

    return {
      result: generateResponse(
        true,
        "getPracticesObject_practice_created",
        "en"
      ),
      data: practice.raw[0],
    };
  }
}

export default PracticeResolver;
