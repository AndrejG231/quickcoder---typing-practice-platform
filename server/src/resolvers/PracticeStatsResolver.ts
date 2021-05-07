import calculatePracticeScore from "../utilities/calculatePracticeScore";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import GraphqlContext from "../types/graphqlContext";
import getUserFromCookie from "../utilities/auth/getUserFromCookie";
import PracticeStatsResponse, {
  PracticeStat,
} from "../types/responses/PracticeScoreResponse";
import generateResponse from "../utilities/generateResponse";
import getRecentPracticeStats from "../utilities/practices/getRecentPractices";
import { getConnection } from "typeorm";
import Practices from "../entities/Practices";

@Resolver()
class PracticeStats {
  @Query(() => PracticeStatsResponse)
  async getPracticeStats(
    @Arg("practiceName") practiceName: string,
    @Ctx() { req }: GraphqlContext
  ) {
    const userData = await getUserFromCookie(req, "en");

    if (!userData.user) {
      return {
        response: userData.error,
      };
    }

    const practiceLength = (
      await getConnection()
        .createQueryBuilder()
        .select("SUM(index)")
        .from(Practices, "practices")
        .where("user_id = :user_id and practice_name = :practice_name", {
          user_id: userData.user.id,
          practice_name: practiceName,
        })
        .execute()
    )[0].sum;

    let practiceScore;
    if (practiceLength >= 500) {
      const practiceData = await getRecentPracticeStats(
        userData.user.id,
        practiceName
      );
      practiceScore = calculatePracticeScore(practiceData);
    } else {
      practiceScore = {
        score: 0,
        cpm: 0,
        error_rate: 0,
      };
    }

    return {
      response: generateResponse(true, "practiceStats_stats_retrieved", "en"),
      stats: [
        {
          ...practiceScore,
          length: practiceLength,
          name: practiceName,
        },
      ],
    };
  }
  @Query(() => PracticeStatsResponse)
  async getUserStats(@Ctx() { req }: GraphqlContext) {
    const userData = await getUserFromCookie(req, "en");

    if (userData.user?.id === undefined) {
      return {
        response: userData.error,
      };
    }

    const stats: PracticeStat[] = await getConnection()
      .createQueryBuilder()
      .select("SUM(index) as length, practice_name as name")
      .from(Practices, "practices")
      .where("user_id = :user_id", { user_id: userData.user.id })
      .groupBy("practice_name")
      .execute();

    for (let i = 0; i < stats.length; i++) {
      if (stats[i].length >= 500) {
        const practiceData = await getRecentPracticeStats(
          userData.user.id,
          stats[i].name
        );
        stats[i] = { ...stats[i], ...calculatePracticeScore(practiceData) };
      } else {
        stats[i] = { ...stats[i], score: 0, cpm: 0, error_rate: 0 };
      }
    }

    return {
      response: generateResponse(true, "practiceStats_stats_retrieved", "en"),
      stats: stats,
    };
  }
}

export default PracticeStats;
