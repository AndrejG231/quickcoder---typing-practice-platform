import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

import {
  GraphqlContext,
  ProfileHistoryResponse,
  ProfileOverviewResponse,
  UnfinishedPracticesResponse,
} from "../../types";

import getProfileOverview from "./getProfileOverview";
import getProfileHistory from "./getProfileHistory";
import getUnfinishedPractices from "./getUnfinishedPractices";

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
  @Query(() => UnfinishedPracticesResponse)
  async getUnfinishedPractices(@Ctx() { req }: GraphqlContext) {
    return await getUnfinishedPractices(req);
  }
}

export default ProfileResolver;
