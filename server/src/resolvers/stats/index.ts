import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

import { practiceScoreResponse } from "../../types/responses";
import { graphqlContext } from "../../types/";
import getPracticeStats from "./getPracticeStats";
import getUserStats from "./getUserStats";

@Resolver()
class PracticeStats {
  @Query(() => practiceScoreResponse)
  async getPracticeStats(
    @Arg("category") category: string,
    @Arg("practiceIndex", () => Int) practiceIndex: number,
    @Ctx() { req }: graphqlContext
  ) {
    return await getPracticeStats(category, practiceIndex, req);
  }
  @Query(() => practiceScoreResponse)
  async getUserStats(@Ctx() { req }: graphqlContext) {
    return await getUserStats(req);
  }
}

export default PracticeStats;
