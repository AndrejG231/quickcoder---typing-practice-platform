import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

//types
import GraphqlContext from "../types/graphqlContext";
import Practices from "../entities/Practices";
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
    @Arg("practiceName", () => String) practiceName: string,
    @Arg("length", () => Int) length: number,
    @Ctx() { req, res }: GraphqlContext
  ) {
    let { user } = await validateUserFromCookie(req, "en");

    if (!user) {
      //Not signed it ==> Use Cookies

      const practice = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Practices)
        .values({
          user_id: -1,
          practice_name: practiceName,
          string: generatePracticeString(practiceName, length),
          created_at: new Date().getSeconds(),
        })
        .execute();

      res.cookie(`@p${new Date().getTime()}`, practice.generatedMaps[0].id, {
        expires: new Date("Tue, 19 Jan 2038 03:14:07 GMT"),
      });


      return {
        result: generateResponse(
          true,
          "getPracticesObject_practice_created",
        ),
        practice: practice.generatedMaps[0],
      };
    }
    //signed User
    const practice = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Practices)
      .values({
        user_id: user.id,
        practice_name: practiceName,
        string: generatePracticeString(practiceName, length),
        created_at: new Date().getSeconds(),
      })
      .execute();


    return {
      result: generateResponse(
        true,
        "getPracticesObject_practice_created",
        "en"
      ),
      practice: practice.generatedMaps[0],
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

  @Query(() => PracticeInfoResponse)
  async getPracticeResult(@Arg("id", () => Int) id: number) {
    const practice = await Practices.findOne({ id: id });

    if (practice) {
      return {
        result: generateResponse(
          true,
          "getPracticesObject_practice_received",
          "en"
        ),
        practice: practice,
      };
    }

    return {
      result: generateResponse(
        false,
        "getPracticesObject_practice_received",
        "en"
      ),
      practice: null,
    };
  }
}

export default PracticeResolver;
