import {
  GraphqlContext,
  ProfileHistoryResponse,
  ProfileOverviewResponse,
} from "../../types";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

import getProfileOverview from "./getProfileOverview";
import getProfileHistory from "./getProfileHistory";

@Resolver()
class ProfileResolver {
  @Query(() => ProfileOverviewResponse)
  async getProfileOverview(@Ctx() { req }: GraphqlContext) {
    return await getProfileOverview(req);
  }
  @Query(() => ProfileHistoryResponse)
  async getProfileHistory(
    @Ctx() { req }: GraphqlContext,
    @Arg("lastDate", { nullable: true }) lastDate?: Date
  ) {
    return await getProfileHistory(req, lastDate);
  }
}

export default ProfileResolver;
