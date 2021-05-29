import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

import {
  practiceLeaderboardResponse,
  practiceScoreResponse,
} from "../../types/responses";
import { graphqlContext } from "../../types/";
import getUserPracticeStats from "./getUserPracticeStats";
import practiceLeaderboard from "./practiceLeaderboard";
import getUserStats from "./getUserStats";

@Resolver()
class PracticeStats {
  @Query(() => practiceLeaderboardResponse)
  async getUserPracticeStats(
    @Arg("category") category: string,
    @Arg("practiceIndex", () => Int) practiceIndex: number,
    @Ctx() { req }: graphqlContext
  ) {
    return await getUserPracticeStats(category, practiceIndex, req);
  }
  @Query(() => practiceScoreResponse)
  async getUserStats(@Ctx() { req }: graphqlContext) {
    return await getUserStats(req);
  }
  @Query(() => [practiceLeaderboardResponse])
  async practiceLeaderboard(
    @Arg("category") category: string,
    @Arg("index", () => Int) index: number
  ) {
    return await practiceLeaderboard(category, index);
  }
}

export default PracticeStats;
