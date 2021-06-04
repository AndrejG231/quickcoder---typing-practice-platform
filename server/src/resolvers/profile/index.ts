import { GraphqlContext, ProfileOverviewResponse } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";
import getProfileOverview from "./getProfileOverview";

@Resolver()
class ProfileResolver {
  @Query(() => ProfileOverviewResponse)
  async getProfileOverview(@Ctx() { req }: GraphqlContext) {
    return await getProfileOverview(req);
  }
}

export default ProfileResolver;
