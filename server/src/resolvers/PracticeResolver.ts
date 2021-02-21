import { Arg, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

import { PracticeStringsKeys } from "../data/PracticeStrings";
//types
import GraphqlContext from "../types/GraphqlContext";
import Practices from "../types/entities/Practices";
import PracticeInfoResponse from "../types/responses/PracticeInfoResponse";
import ActionResponse from "../types/responses/ActionResponse";
import PracticeUpdateFields from "../types/arguments/PracticeUpdateFields";

//utilities
import generateResponse from "../utilities/generateResponse";
import validateUserFromCookie from "../utilities/auth/validateUserFromCookie";
import generatePracticeString from "../utilities/practices/generatePracticeString";

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
      practice: practice.raw[0],
    };
  }
  @Mutation(() => ActionResponse)
  async updatePractice(
    @Arg("practiceId", () => Int) practiceId: number,
    @Arg("practiceUpdateFields", () => PracticeUpdateFields)
    practiceUpdateFields: PracticeUpdateFields
  ) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Practices)
        .set(practiceUpdateFields)
        .where("id = :id", { id: practiceId })
        .execute();

      return generateResponse(
        true,
        "updatePracticeObject_practice_updated",
        "en"
      );
    } catch (err) {
      console.log(err);
      return generateResponse(
        false,
        "updatePracticeObject_practice_failed",
        "en"
      );
    }
  }
  @Mutation(() => ActionResponse)
  async deletePractice(@Arg("practiceId", () => Int) practiceId: number) {
    try {
      await Practices.delete({ id: practiceId });
      return generateResponse(
        true,
        "updatePracticeObject_practice_updated",
        "en"
      );
    } catch (error) {
      console.log(error);
      return generateResponse(
        false,
        "updatePracticeObject_practice_failed",
        "en"
      );
    }
  }
}

export default PracticeResolver;
