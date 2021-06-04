import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

import {
  GraphqlContext,
  PracticeStatsResponse,
  PracticeLeaderboardResponse,
} from "../../types/";
import getUserPracticeStats from "./getUserPracticeStats";
import practiceLeaderboard from "./practiceLeaderboard";
import getUserStats from "./getUserStats";

@Resolver()
class PracticeStats {
  @Query(() => PracticeLeaderboardResponse)
  async getUserPracticeStats(
    @Arg("category") category: string,
    @Arg("practiceIndex", () => Int) practiceIndex: number,
    @Ctx() { req }: GraphqlContext
  ) {
    return await getUserPracticeStats(category, practiceIndex, req);
  }
  @Query(() => PracticeStatsResponse)
  async getUserStats(@Ctx() { req }: GraphqlContext) {
    return await getUserStats(req);
  }
  @Query(() => [PracticeLeaderboardResponse])
  async practiceLeaderboard(
    @Arg("category") category: string,
    @Arg("index", () => Int) index: number
  ) {
    return await practiceLeaderboard(category, index);
  }
}

export default PracticeStats;
