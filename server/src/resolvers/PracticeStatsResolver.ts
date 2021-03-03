import Practices from "../types/entities/Practices";
import calculatePracticeScore from "../utilities/calculatePracticeScore";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import GraphqlContext from "../types/GraphqlContext";
import getUserFromCookie from "../utilities/auth/getUserFromCookie";
import PracticeScoreResponse from "../types/responses/PracticeScoreResponse";
import generateResponse from "../utilities/generateResponse";
import getRecentPracticeStats from "../utilities/practices/getRecentPractices";

@Resolver()
class PracticeStats {
  @Query(() => PracticeScoreResponse)
  async getPracticeRangeStats(
    @Arg("practiceName") practiceName: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const userData = await getUserFromCookie(req, "en");

    if (!userData.user) {
      return {
        response: userData.error,
      };
    }

    const practiceData = await getRecentPracticeStats(
      userData.user.id,
      practiceName
    );
    
   const practiceScore = calculatePracticeScore(practiceData);

    return {
      response: generateResponse(
        true,
        "changePassword_newPassword_noInclude",
        "en"
      ),
      score: practiceScore,
    };
  }
}

export default PracticeStats;
