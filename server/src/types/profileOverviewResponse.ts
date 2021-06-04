import { ObjectType, Field } from "type-graphql";
import { PracticeStat, ActionResponse, AverageUserStats } from ".";

@ObjectType()
class ProfileOverviewResponse {
  @Field(() => AverageUserStats, { nullable: true })
  averageStats?: AverageUserStats;

  @Field(() => [PracticeStat], { nullable: true })
  lastPractices?: PracticeStat[];

  @Field(() => ActionResponse)
  result: ActionResponse;
}

export default ProfileOverviewResponse;
